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
import ResetPasswordActions from '../Redux/ResetPasswordRedux'
import { dbService } from '../Services/Firebase'

export function * resetPassword ({ email, alertfunc}) {
  try
  {
    const response = yield call(dbService.auth.sendPasswordResetEmail,email.toString());
    console.tron.log(response);
    yield put(ResetPasswordActions.resetPasswordSuccess({ username : { username : "hi me" }}));

  }
  catch(error)
  {
    yield put(ResetPasswordActions.resetPasswordFailure(error));
    alertfunc('error','Error', error.message)
  }
}
