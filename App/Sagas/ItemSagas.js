
import { call, put, take } from 'redux-saga/effects'
import ItemActions from '../Redux/ItemRedux'
import { mapp, dbService } from '../Services/Firebase'

const usr = mapp.auth();


export function * syncItemSaga() {
  console.log(mapp.database.channel);
  console.log(usr.currentUser.uid);
  const channel = yield call(dbService.database.channel, `items`);

  while(true) {
    const { value: items } = yield take(channel);
    console.log(items);
    yield put(ItemActions.itemSuccess(items))
  }
}

