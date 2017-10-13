
import { call, put } from 'redux-saga/effects'
import ItemChatPostActions from '../Redux/ItemChatPostRedux'
import { mapp } from '../Services/Firebase'

const db = mapp.database();

export function * itemChatPost (action) {
  const { data } = action;
  const { text, buyerName, buyerId, buyerPic, sellerName, sellerId, sellerPic, itemSummary, itemKey } = data;
  const msgObj = Object.assign({ text, buyerName, buyerId, buyerPic, sellerName, sellerId, sellerPic, itemSummary, itemKey },
    { createdAt : data.createdAt} );
  console.log(action);
  console.log(msgObj);


  try
  {
    let sellerMsgRef =
      db.ref(`users/${data.sellerId}/messages`)
        .push(msgObj);
    const sellerMsgKey = sellerMsgRef.key;

    let buyerMsgRef =
      db.ref(`users/${data.buyerId}/messages`)
        .push(msgObj);
    const buyerMsgKey = buyerMsgRef.key;

    let notifRef =
      db.ref(`users/${data.buyerId}/notifications`)
        .push(msgObj);
    const notifKey = notifRef.key;

    yield put(ItemChatPostActions.itemChatPostSuccess({sellerMsgKey, buyerMsgKey, notifKey}));
  }
  catch (error)
  {
    yield put(ItemChatPostActions.itemChatPostFailure({error}));
  }
}
