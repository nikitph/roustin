
import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { dbService } from '../Services/Firebase'

// attempts to login
export function * login ({ email, password }) {
  console.tron.log(email, password);
  try
  {
    const response = yield call(dbService.auth.signInWithEmailAndPassword,email.toString(), password.toString(), function () {});
    console.tron.log(response);

    yield put(LoginActions.loginSuccess({ username : { username : "hi me" }}));

  }
  catch(error)
  {
    yield put(LoginActions.loginFailure(error))
  }
}
