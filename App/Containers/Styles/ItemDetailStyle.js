import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container :{
    marginTop:5,
    backgroundColor: '#F1E7D1'
  },
  btnCtnr: {
    display: 'flex',
    flexDirection: 'row',
  }
})
