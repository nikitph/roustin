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
    margin: 0,
    padding:10,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
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
    color: 'rgb(79, 18, 34)',
    fontSize:16,
    fontFamily:'Avenir'
  },
  listContent: {
    marginTop: 5
  }
})
