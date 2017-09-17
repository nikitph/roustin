// @flow

import {StyleSheet} from 'react-native'
import {ApplicationStyles} from '../../Themes/'
import {Images, Metrics, Colors} from '../../Themes'


export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.5,
  },
  cart: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.35,
  }
})
