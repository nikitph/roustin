import { call, put } from 'redux-saga/effects'
import SellItemActions from '../Redux/SellItemRedux'
import { mapp } from '../Services/Firebase'
import { Platform } from 'react-native'
import { fileUpload, itemFileUpload } from '../Services/Uploader'

const storage = mapp.storage();
const usr = mapp.auth();
const db = mapp.database();

export function * sellItemSaga ({data, nav}) {

  const {
    itemSummary,
    details,
    price,
    sold,
    negotiable,
    sellerId,
    sellerName,
    sellerPic,
    eventImageOneUrl,
    eventImageTwoUrl,
    eventImageThreeUrl
  } = data;

  let storageRef = storage.ref(`itemImages/${usr.currentUser.uid}`);

  try
  {
    let eventImageOneLoc = 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
      eventImageTwoLoc = 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
      eventImageThreeLoc = 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png';
    if (eventImageOneUrl) {
      const uploadUriOne = Platform.OS === 'ios' ? eventImageOneUrl.uri.replace('file://', '') : eventImageOneUrl.uri;
      eventImageOneLoc = yield call(itemFileUpload, uploadUriOne, eventImageOneUrl.name, storageRef);
    }
    if (eventImageTwoUrl)
    {
      const uploadUriTwo = Platform.OS === 'ios' ? eventImageTwoUrl.uri.replace('file://', '') : eventImageTwoUrl.uri;
      eventImageTwoLoc = yield call(itemFileUpload, uploadUriTwo, eventImageTwoUrl.name, storageRef);
    }
    if (eventImageThreeUrl)
    {
      const uploadUriThree = Platform.OS === 'ios' ? eventImageThreeUrl.uri.replace('file://', '') : eventImageThreeUrl.uri;
      eventImageThreeLoc = yield call(itemFileUpload, uploadUriThree, eventImageThreeUrl.name, storageRef);
    }

    let itemRef =
      db.ref(`items/`)
        .push({
          itemSummary,
          details,
          price,
          sold,
          negotiable,
          sellerId,
          sellerName,
          sellerPic,
          eventImageOneUrl: eventImageOneLoc,
          eventImageTwoUrl: eventImageTwoLoc,
          eventImageThreeUrl: eventImageThreeLoc,
        });

    const itemkey = itemRef.key;

    let userItemRef =
      db.ref(`users/${usr.currentUser.uid}/sells`)
        .push({
          itemSummary,
          details,
          price,
          sold,
          negotiable,
          sellerId,
          sellerName,
          sellerPic,
          eventImageOneUrl: eventImageOneLoc,
          eventImageTwoUrl: eventImageTwoLoc,
          eventImageThreeUrl: eventImageThreeLoc,
        });
    const userItemkey = userItemRef.key;
    yield put(SellItemActions.sellItemSuccess({ itemkey, userItemkey }));
    yield call(nav.navigate, 'ConfirmationPage', {message: 'Item Successfully Saved'})

  }
  catch(error)
  {
    //alertfunc('error','Error', error.message)
  }
}
