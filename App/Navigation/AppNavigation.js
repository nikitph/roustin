import { StackNavigator } from 'react-navigation'
import WalkThroughScreen from '../Containers/WalkThroughScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  WalkThroughScreen: { screen: WalkThroughScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'WalkThroughScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
