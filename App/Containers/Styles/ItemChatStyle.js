import {StyleSheet} from 'react-native'
import {ApplicationStyles} from '../../Themes/'
import Metrics from '../../Themes/Metrics'


export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {},
  containertwo: {
    flex: 1,
    height: Metrics.screenHeight,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#F1E7D1'
  },
})
