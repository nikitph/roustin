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
    backgroundColor:'transparent'
  },
  conContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent:'space-around',
    backgroundColor:'rgba(0,0,0,0.1)'
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 500,
    borderTopWidth: 20,
    borderRightColor: 'transparent',
    borderTopColor: '#1F1C18'
  }
})
