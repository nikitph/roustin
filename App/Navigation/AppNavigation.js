import { StackNavigator } from 'react-navigation'
import BuyConversations from '../Containers/BuyConversations'
import SellConversation from '../Containers/SellConversation'
import BuyConversation from '../Containers/BuyConversation'
import ItemChat from '../Containers/ItemChat'
import ItemDetail from '../Containers/ItemDetail'
import BuyItem from '../Containers/BuyItem'
import SellItemScreen from '../Containers/SellItemScreen'
import React, {Component} from 'react'
import DrawerContent from '../Containers/DrawerContent'
import Dashboard from '../Containers/Dashboard'
import SignUpDetailsScreen from '../Containers/SignUpDetailsScreen'
import ResetPasswordScreen from '../Containers/ResetPasswordScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import LoginScreen from '../Containers/LoginScreen'
import WalkThroughScreen from '../Containers/WalkThroughScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  BuyConversations: { screen: BuyConversations },
  SellConversation: { screen: SellConversation },
  BuyConversation: { screen: BuyConversation },
  ItemChat: { screen: ItemChat },
  ItemDetail: { screen: ItemDetail },
  BuyItem: { screen: BuyItem },
  SellItemScreen: { screen: SellItemScreen },
  Dashboard: { screen: Dashboard },
  SignUpDetailsScreen: { screen: SignUpDetailsScreen },
  ResetPasswordScreen: { screen: ResetPasswordScreen },
  SignUpScreen: { screen: SignUpScreen },
  LoginScreen: { screen: LoginScreen, headerMode:'screen' },
  WalkThroughScreen: { screen: WalkThroughScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'screen',
  gesturesEnabled: false,
  initialRouteName: 'WalkThroughScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
