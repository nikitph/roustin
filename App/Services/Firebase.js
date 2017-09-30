/**
 * Created by Omkareshwar on 9/18/17.
 */
import firebase from 'firebase'
import config from './FirebaseConfig'
import ReduxSagaFirebase from 'redux-saga-firebase';

export const mapp = firebase.initializeApp(config);
export const dbService = new ReduxSagaFirebase(mapp);
