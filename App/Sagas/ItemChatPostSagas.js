
import { call, put } from 'redux-saga/effects'
import ItemChatPostActions from '../Redux/ItemChatPostRedux'
import { mapp } from '../Services/Firebase'

const db = mapp.database();

export function * itemChatPost (action) {
  const { data } = action;
  const { text, buyerName, buyerId, buyerPic, sellerName, sellerId, sellerPic, itemSummary, itemKey, createdAt } = data;
  const msgObj = { text, buyerName, buyerId, buyerPic, sellerName, sellerId, sellerPic, itemSummary, itemKey, createdAt };
  console.log(action);

  try
  {
    let sellerMsgRef =
      db.ref(`threads/${data.sellerId}/${data.buyerId}/${itemKey}/messages`)
        .push(msgObj);
    const sellerMsgKey = sellerMsgRef.key;

    let buyerMsgRef =
      db.ref(`threadb/${data.buyerId}/${data.sellerId}/${itemKey}/messages`)
        .push(msgObj);
    const buyerMsgKey = buyerMsgRef.key;

    yield put(ItemChatPostActions.itemChatPostSuccess({sellerMsgKey, buyerMsgKey}));
  }
  catch (error)
  {
    yield put(ItemChatPostActions.itemChatPostFailure({error}));
  }
}
