import { call, put, take } from 'redux-saga/effects'
import ItemChatActions from '../Redux/ItemChatRedux'
import { mapp, dbService } from '../Services/Firebase'

const usr = mapp.auth();


export function * syncMsgSaga() {
  console.log(mapp.database.channel);
  console.log(usr.currentUser.uid);
  const channel = yield call(dbService.database.channel, `users/${usr.currentUser.uid}/messages`);

  while(true) {
    const { value: messages } = yield take(channel);
    console.log(messages);
    yield put(ItemChatActions.itemChatSuccess(messages))
  }
}
