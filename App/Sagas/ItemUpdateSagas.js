import { call, put } from 'redux-saga/effects'
import ItemUpdateActions from '../Redux/ItemUpdateRedux'
import { mapp, dbService } from '../Services/Firebase'
import { Platform } from 'react-native'
import { itemFileUpload } from '../Services/Uploader'

const usr = mapp.auth();
const storage = mapp.storage();

export function * itemUpdateSaga ( action) {
  const {data, nav} = action;
  let {itemKey, ...item} = data;
  const {
    eventImageOneUrl,
    eventImageTwoUrl,
    eventImageThreeUrl
  } = data;
  let storageRef = storage.ref(`itemImages/${usr.currentUser.uid}`);
  let eventImageOneLoc,
    eventImageTwoLoc,
    eventImageThreeLoc;

  if (eventImageOneUrl.uri) {
    const uploadUriOne = Platform.OS === 'ios' ? eventImageOneUrl.uri.replace('file://', '') : eventImageOneUrl.uri;
    eventImageOneLoc = yield call(itemFileUpload, uploadUriOne, eventImageOneUrl.name, storageRef);
  }
  else
    eventImageOneLoc = eventImageOneUrl;

  if (eventImageTwoUrl.uri) {
    const uploadUriTwo = Platform.OS === 'ios' ? eventImageTwoUrl.uri.replace('file://', '') : eventImageTwoUrl.uri;
    eventImageTwoLoc = yield call(itemFileUpload, uploadUriTwo, eventImageTwoUrl.name, storageRef);
  }
  else
    eventImageTwoLoc = eventImageTwoUrl;
  if (eventImageThreeUrl.uri) {
    const uploadUriThree = Platform.OS === 'ios' ? eventImageThreeUrl.uri.replace('file://', '') : eventImageThreeUrl.uri;
    eventImageThreeLoc = yield call(itemFileUpload, uploadUriThree, eventImageThreeUrl.name, storageRef);
  }
  else
    eventImageThreeLoc = eventImageThreeUrl;

  item.eventImageOneUrl = eventImageOneLoc;
  item.eventImageTwoUrl = eventImageTwoLoc;
  item.eventImageThreeUrl = eventImageThreeLoc;

  // make the call to the api
  const itemResponse = yield call(dbService.database.patch,`items/${itemKey}`, item );
  const userItemResponse = yield call(dbService.database.patch,`users/${usr.currentUser.uid}/sells/${itemKey}`, item);

  yield put(ItemUpdateActions.itemUpdateSuccess({ itemResponse, userItemResponse }));
  yield call(nav.navigate, 'ConfirmationPage', {message: 'Item Updated Successfully'})

}
