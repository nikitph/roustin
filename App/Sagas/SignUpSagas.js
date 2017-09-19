import { call, put } from 'redux-saga/effects'
import SignUpActions from '../Redux/SignUpRedux'
import { dbService } from '../Services/Firebase'

export function * signUp ({ email, password, alertfunc}) {
  try
  {
    const response = yield call(dbService.auth.createUserWithEmailAndPassword,email.toString(), password.toString(), function () {});
    console.tron.log(response);
    yield put(SignUpActions.signUpSuccess({ username : { username : "hi me" }}));

  }
  catch(error)
  {
    yield put(SignUpActions.signUpFailure(error));
    alertfunc('error','Error', error.message)
  }
}
