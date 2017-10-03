import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {},
  containertwo: {
    flex: 1,
    marginTop:20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#F1E7D1'
  },
  slideContainer: {
    flex: 0.1,
    backgroundColor: '#F4B459',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

  },
  slide: {
    flex: 1,
  },
  slide1: {
    backgroundColor: '#F4B459',
  },
  slide2: {
    backgroundColor: '#F4B459',
  },
  slide3: {
    backgroundColor: '#F4B459',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
})
