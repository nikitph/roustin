import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: '#F1E7D1'
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    justifyContent: 'center',
    alignItems:'stretch'

  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.bloodOrange,
    backgroundColor:'rgba(0,0,0,0.3)'
  },
  listContent: {
    marginTop: Metrics.baseMargin
  }
})
