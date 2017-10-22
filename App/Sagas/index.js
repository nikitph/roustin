import { takeLatest, all, takeEvery } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { SignUpTypes} from '../Redux/SignUpRedux'
import { SellItemTypes} from '../Redux/SellItemRedux'
import { SignUpDetailsTypes} from '../Redux/SignUpDetailsRedux'
import { ItemChatTypes} from '../Redux/ItemChatRedux'
import { ItemTypes} from '../Redux/ItemRedux'
import { ItemUpdateTypes} from '../Redux/ItemUpdateRedux'
import { ItemDeleteTypes} from '../Redux/ItemDeleteRedux'

import { ItemChatPostTypes} from '../Redux/ItemChatPostRedux'
import { NotificationsTypes } from '../Redux/NotificationsRedux'

import { ResetPasswordTypes } from '../Redux/ResetPasswordRedux'



/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { login } from './LoginSagas'
import { signUp } from './SignUpSagas'
import { uploadSaga } from './SignUpDetailsSagas'
import { resetPassword } from './ResetPasswordSagas'
import { sellItemSaga }  from './SellItemSagas'
import { syncMsgSaga } from './ItemChatSagas'
import { syncItemSaga } from './ItemSagas'
import { itemUpdateSaga } from './ItemUpdateSagas'
import { itemDeleteSaga } from './ItemDeleteSagas'
import { itemChatPost } from './ItemChatPostSagas'
import { syncNotificationsSaga } from './NotificationsSagas'
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
    takeLatest(ResetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword),
    takeLatest(SellItemTypes.SELL_ITEM_REQUEST, sellItemSaga),
    takeLatest(ItemChatTypes.ITEM_CHAT_REQUEST, syncMsgSaga),
    takeLatest(NotificationsTypes.NOTIFICATIONS_REQUEST, syncNotificationsSaga),
    takeLatest(ItemTypes.ITEM_REQUEST, syncItemSaga),
    takeLatest(ItemChatPostTypes.ITEM_CHAT_POST_REQUEST, itemChatPost),
    takeLatest(ItemDeleteTypes.ITEM_DELETE_REQUEST, itemDeleteSaga),
    takeLatest(ItemUpdateTypes.ITEM_UPDATE_REQUEST, itemUpdateSaga)

  ])
}
