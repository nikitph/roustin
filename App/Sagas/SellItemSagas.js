import { call, put } from 'redux-saga/effects'
import SellItemActions from '../Redux/SellItemRedux'
import { mapp } from '../Services/Firebase'
import { Platform } from 'react-native'
import { fileUpload, itemFileUpload } from '../Services/Uploader'
import { NavigationActions } from 'react-navigation'

const storage = mapp.storage();
const usr = mapp.auth();
const db = mapp.database();


export function * sellItemSaga (data) {

  const {
    itemSummary,
    details,
    price,
    sold,
    negotiable,
    sellerId,
    sellerName,
    sellerPic,
    eventImageOne,
    eventImageTwo,
    eventImageThree
  } = data.data;

  let storageRef = storage.ref(`itemImages/${usr.currentUser.uid}`);

  try
  {
    let eventImageOneUrl='https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
      eventImageTwoUrl='https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
      eventImageThreeUrl ='https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png';
    if(eventImageOne) {
      const uploadUriOne = Platform.OS === 'ios' ? eventImageOne.uri.replace('file://', '') : eventImageOne.uri;
      eventImageOneUrl = yield call(itemFileUpload, uploadUriOne, eventImageOne.name,  storageRef);
    }
    if(eventImageTwo)
    {
      const uploadUriTwo = Platform.OS === 'ios' ? eventImageOne.uri.replace('file://', '') : eventImageTwo.uri;
      eventImageTwoUrl = yield call(itemFileUpload, uploadUriTwo,eventImageTwo.name, storageRef);
    }
    if(eventImageThree)
    {
      const uploadUriThree = Platform.OS === 'ios' ? eventImageThree.uri.replace('file://', '') : eventImageThree.uri;
      eventImageThreeUrl = yield call(itemFileUpload, uploadUriThree, eventImageThree.name, storageRef);
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
          eventImageOneUrl,
          eventImageTwoUrl,
          eventImageThreeUrl
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
          eventImageOneUrl,
          eventImageTwoUrl,
          eventImageThreeUrl
        });
    const userItemkey = userItemRef.key;
    yield put(SellItemActions.sellItemSuccess({ itemkey, userItemkey }));
    //yield call(nav.navigate,'Dashboard',{ uid, displayName, url })

  }
  catch(error)
  {
    //alertfunc('error','Error', error.message)
  }
}
