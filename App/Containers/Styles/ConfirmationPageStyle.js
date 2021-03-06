import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4EAD3',
  },
  text: {
    color: "black",
    fontSize: 22,
    fontFamily: 'AvenirNext-UltraLight'

  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.4,
  },
  btnCtnr: {
    display: 'flex',
    flexDirection: 'row',
  },
})
