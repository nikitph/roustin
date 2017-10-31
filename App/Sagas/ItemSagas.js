
import { call, put, take } from 'redux-saga/effects'
import ItemActions from '../Redux/ItemRedux'
import { mapp, dbService } from '../Services/Firebase'

const usr = mapp.auth();


export function * syncItemSaga() {

  const channel = yield call(dbService.database.channel, `items`);

  while(true) {
    const { value: items } = yield take(channel);
    yield put(ItemActions.itemSuccess(items))
  }
}

