
import { call, put } from 'redux-saga/effects'
import ItemChatPostActions from '../Redux/ItemChatPostRedux'
import { mapp } from '../Services/Firebase'

const db = mapp.database();

export function * itemChatPost (action) {
  const { data } = action;
  const { message } = data;

  try
  {
    let sellerMsgRef =
      db.ref(`users/${data.seller}/messages`)
        .push({message});
    const sellerMsgKey = sellerMsgRef.key;

    let buyerMsgRef =
      db.ref(`users/${data.buyer}/messages`)
        .push({message});
    const buyerMsgKey = buyerMsgRef.key;

    yield put(ItemChatPostActions.itemChatPostSuccess({sellerMsgKey, buyerMsgKey}));
  }
  catch (error)
  {
    yield put(ItemChatPostActions.itemChatPostFailure({error}));
  }
}
