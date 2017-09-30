import { call, put } from 'redux-saga/effects'
import SignUpDetailsActions from '../Redux/SignUpDetailsRedux'
import { dbService, mapp } from '../Services/Firebase'
import {Platform } from 'react-native'
import { fileUpload } from '../Services/Uploader'

const storage = mapp.storage();
const usr = mapp.auth();


export function * uploadSaga ({ image, displayName, alertfunc, nav, uid}) {
  let storageRef = storage.ref(`user-images/${uid}`);
  const uploadUri = Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;

  try
  {
    const url = yield call(fileUpload, uploadUri,storageRef);
    usr.currentUser.updateProfile({displayName: displayName, photoURL:url});
    yield put(SignUpDetailsActions.signUpDetailsSuccess({ uid : 'yup'}));

  }
  catch(error)
  {
    alertfunc('error','Error', error.message)
  }
}
