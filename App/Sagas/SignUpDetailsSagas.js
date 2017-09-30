import { call, put } from 'redux-saga/effects'
import SignUpDetailsActions from '../Redux/SignUpDetailsRedux'
import { dbService, mapp } from '../Services/Firebase'
import { eventChannel, takeEvery } from 'redux-saga'
import {Platform } from 'react-native'
import { fileUpload } from '../Services/Uploader'

const storage = mapp.storage();
const database = mapp.database();


export function * uploadSaga ({ image, displayName, alertfunc, nav}) {
  console.tron.log(image, displayName, nav);
  console.tron.log(displayName, nav);
  let storageRef = storage.ref(`event-images/xyz`);
  let hostRef = database.ref(`hostEvents/abc`);


  const uploadUri = Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;
  fileUpload(state.profileImage.uri,'', storageRef, hostRef);



  try
  {
    const task = yield call(dbService.storage.uploadFile, 'images/', uploadUri);
console.tron.log('hmm');
    const channel = eventChannel(emit => task.on('state_changed', emit));

    yield takeEvery(channel);

    // Wait for upload to complete
    yield task

  }
  catch(error)
  {
    alertfunc('error','Error', error.message)
  }
}
