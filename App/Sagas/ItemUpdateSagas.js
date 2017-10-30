/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import ItemUpdateActions from '../Redux/ItemUpdateRedux'
import { mapp,dbService } from '../Services/Firebase'

const usr = mapp.auth();

export function * itemUpdateSaga ( action) {
  const {data, nav} = action;
  const { itemKey, ...item } = data;
  console.log(item);
  // make the call to the api
  const itemResponse = yield call(dbService.database.patch,`items/${itemKey}`, item );
  const userItemResponse = yield call(dbService.database.patch,`users/${usr.currentUser.uid}/sells/${itemKey}`, item);

  yield put(ItemUpdateActions.itemUpdateSuccess({ itemResponse, userItemResponse }));
  yield call(nav.navigate, 'ConfirmationPage', {message: 'Item Updated Successfully'})

}
