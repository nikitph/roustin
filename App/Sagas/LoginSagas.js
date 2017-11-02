import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import ItemChatActions from '../Redux/ItemChatRedux'
import ItemActions from '../Redux/ItemRedux'
import NotificationsActions from '../Redux/NotificationsRedux'
import { dbService } from '../Services/Firebase'
import { NavigationActions } from 'react-navigation'

// attempts to login
export function * login ({ email, password, alertfunc, nav}) {
  try
  {
    const response = yield call(dbService.auth.signInWithEmailAndPassword,email.toString(), password.toString(), function () {});
    const {uid, displayName, photoURL} = response;
    const location = yield call(dbService.database.read, `users/${uid}/location`);
    yield put(LoginActions.loginSuccess({uid, displayName, photoURL, location}));
    yield put(ItemChatActions.itemChatRequest());
    yield put(ItemActions.itemRequest());
    yield put(NotificationsActions.notificationsRequest());
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Dashboard'},{ uid, displayName, photoURL })
      ]
    });
    yield call(nav.dispatch,resetAction)

  }
  catch(error)
  {
    yield put(LoginActions.loginFailure(error));
    alertfunc('error','Error', error.message)
  }
}
