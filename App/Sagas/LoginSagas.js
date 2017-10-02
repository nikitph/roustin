
import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { dbService } from '../Services/Firebase'

// attempts to login
export function * login ({ email, password, alertfunc, nav}) {
  console.tron.log(alertfunc, password);
  try
  {
    const response = yield call(dbService.auth.signInWithEmailAndPassword,email.toString(), password.toString(), function () {});
    const { uid, displayName, photoURL } = response
    yield put(LoginActions.loginSuccess({ uid, displayName, photoURL }));
    yield call(nav.navigate,'Dashboard',{ uid, displayName, photoURL })

  }
  catch(error)
  {
    yield put(LoginActions.loginFailure(error));
    alertfunc('error','Error', error.message)
  }
}
