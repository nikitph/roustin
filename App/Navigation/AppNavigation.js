import { StackNavigator } from 'react-navigation'
import SignUpScreen from '../Containers/SignUpScreen'
import LoginScreen from '../Containers/LoginScreen'
import WalkThroughScreen from '../Containers/WalkThroughScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SignUpScreen: { screen: SignUpScreen },
  LoginScreen: { screen: LoginScreen, headerMode:'screen' },
  WalkThroughScreen: { screen: WalkThroughScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'WalkThroughScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
