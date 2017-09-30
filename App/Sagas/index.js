import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { SignUpTypes} from '../Redux/SignUpRedux'
import { SignUpDetailsTypes} from '../Redux/SignUpDetailsRedux'

import { ResetPasswordTypes } from '../Redux/ResetPasswordRedux'



/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { login } from './LoginSagas'
import { signUp } from './SignUpSagas'
import { uploadSaga } from './SignUpDetailsSagas'
import { resetPassword } from './ResetPasswordSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(SignUpTypes.SIGN_UP_REQUEST, signUp),
    takeLatest(SignUpDetailsTypes.SIGN_UP_DETAILS_REQUEST, uploadSaga),
    takeLatest(ResetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword)

  ])
}
