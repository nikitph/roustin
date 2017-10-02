import { StyleSheet } from 'react-native'
import { Images, Metrics } from '../../Themes'


export default StyleSheet.create({
  row : {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent:'space-around',
    backgroundColor:'white'
  }
})
