import { call, put } from 'redux-saga/effects'
import SignUpDetailsActions from '../Redux/SignUpDetailsRedux'
import { dbService, mapp } from '../Services/Firebase'
import {Platform } from 'react-native'
import { fileUpload } from '../Services/Uploader'
import { NavigationActions } from 'react-navigation'

const storage = mapp.storage();
const usr = mapp.auth();


export function * uploadSaga ({ image, displayName, alertfunc, nav, uid}) {
  let storageRef = storage.ref(`user-images/${uid}`);
  const uploadUri = Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Dashboard'})
    ]
  });

  try
  {
    const url = yield call(fileUpload, uploadUri,storageRef);
    usr.currentUser.updateProfile({displayName: displayName});
    yield put(SignUpDetailsActions.signUpDetailsSuccess({ uid, displayName, url }));
    yield call(nav.navigate,'Dashboard',{ uid, displayName, url })

  }
  catch(error)
  {
    alertfunc('error','Error', error.message)
  }
}
