import { call, put, take } from 'redux-saga/effects'
import NotificationsActions from '../Redux/NotificationsRedux'
import { mapp, dbService } from '../Services/Firebase'

const usr = mapp.auth();


export function * syncNotificationsSaga() {
  console.log(mapp.database.channel);
  console.log(usr.currentUser.uid);
  const channel = yield call(dbService.database.channel, `users/${usr.currentUser.uid}/notifications`);

  while(true) {
    const { value: notifications } = yield take(channel);
    console.log(notifications);
    yield put(NotificationsActions.notificationsSuccess(notifications))
  }
}
