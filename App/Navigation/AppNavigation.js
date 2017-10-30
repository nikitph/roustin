import { StackNavigator } from 'react-navigation'
import ConfirmationPage from '../Containers/ConfirmationPage'
import MyItems from '../Containers/MyItems'
import Notifications from '../Containers/Notifications'
import BuyConversations from '../Containers/BuyConversations'
import ItemChat from '../Containers/ItemChat'
import ItemDetail from '../Containers/ItemDetail'
import BuyItem from '../Containers/BuyItem'
import SellItemScreen from '../Containers/SellItemScreen'
import React, {Component} from 'react'
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
  ConfirmationPage: {
    screen: ConfirmationPage,
    mode: 'modal',
    headerMode: 'none'
  },
  MyItems: { screen: MyItems },
  Notifications: { screen: Notifications },
  BuyConversations: { screen: BuyConversations },
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
