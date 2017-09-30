import { call, put } from 'redux-saga/effects'
import SignUpDetailsActions from '../Redux/SignUpDetailsRedux'
import { dbService, mapp } from '../Services/Firebase'
import { eventChannel, takeEvery } from 'redux-saga'
import {Platform } from 'react-native'
import { fileUpload } from '../Services/Uploader'

const storage = mapp.storage();
const database = mapp.database();
const usr = mapp.auth();


export function * uploadSaga ({ image, displayName, alertfunc, nav, uid}) {
  let storageRef = storage.ref(`user-images/${uid}`);
  let hostRef = database.ref(`hostEvents/abc`);
  const uploadUri = Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;

  try
  {
    yield call(fileUpload, uploadUri,storageRef);
    usr.currentUser.updateProfile({displayName: displayName});

    yield put(SignUpDetailsActions.signUpDetailsSuccess({ uid : 'yup'}));

  }
  catch(error)
  {
    alertfunc('error','Error', error.message)
  }
}
