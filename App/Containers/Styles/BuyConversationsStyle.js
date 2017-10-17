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
    backgroundColor: 'rgba(116,100,78,0.4)',
    margin: Metrics.smallMargin,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:20
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  conContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  label: {
    textAlign: 'center',
    color: 'white',
    fontSize:16,
    fontFamily:'Avenir'
  },
  listContent: {
    marginTop: Metrics.baseMargin
  }
})
