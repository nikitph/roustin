import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    github: require('./GithubRedux').reducer,
    search: require('./SearchRedux').reducer,
    login: require('./LoginRedux').reducer,
    signup: require('./SignUpRedux').reducer,
    reset: require('./ResetPasswordRedux').reducer,
    signupdetails: require('./SignUpDetailsRedux').reducer
  });

  return configureStore(rootReducer, rootSaga)
}
