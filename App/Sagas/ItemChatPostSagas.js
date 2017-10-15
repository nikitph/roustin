
import { call, put } from 'redux-saga/effects'
import ItemChatPostActions from '../Redux/ItemChatPostRedux'
import { mapp } from '../Services/Firebase'

const db = mapp.database();

export function * itemChatPost (action) {
  const { data } = action;
  const { text, buyerName, buyerId, buyerPic, sellerName, sellerId, sellerPic, itemSummary, itemKey, _id } = data;
  const msgObj = Object.assign({ text, buyerName, buyerId, buyerPic, sellerName, sellerId, itemSummary, itemKey, _id },
    { createdAt : data.createdAt.toJSON()}, { user : data.user }, { sellerPic : data.sellerPic || 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'});
  console.log(db);
  console.log(msgObj);


  try
  {
    let sellerMsgRef =
      db.ref(`users/${data.sellerId}/messages`)
        .push(msgObj);
    const sellerMsgKey = sellerMsgRef.key;
    console.log(msgObj);

    let buyerMsgRef =
      db.ref(`users/${data.buyerId}/messages`)
        .push(msgObj);
    const buyerMsgKey = buyerMsgRef.key;
    console.log(msgObj);

    let id = data.user._id == data.buyerId ? data.sellerId : data.buyerId;
    let notifRef =
      db.ref(`users/${id}/notifications`)
        .push(msgObj);
    const notifKey = notifRef.key;
    console.log(msgObj);

    yield put(ItemChatPostActions.itemChatPostSuccess({sellerMsgKey, buyerMsgKey, notifKey}));
  }
  catch (error)
  {
    console.log(error);
    yield put(ItemChatPostActions.itemChatPostFailure({error}));
  }
}
