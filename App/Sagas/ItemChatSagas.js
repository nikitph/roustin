import { call, put } from 'redux-saga/effects'
import ItemChatActions from '../Redux/ItemChatRedux'
import { mapp } from '../Services/Firebase'
import { take } from 'redux-saga'
const usr = mapp.auth();


export function * syncMsgSaga() {
  const channel = yield call(mapp.database.channel, `users/${usr.currentUser.uid}/messages`);

  while(true) {
    const { value: messages } = yield take(channel);
    yield put(ItemChatActions.itemChatSuccess(messages))
  }
}
