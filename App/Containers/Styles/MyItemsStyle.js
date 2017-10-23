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
    backgroundColor: 'transparent',
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
  },
  topacity:{flex:1, alignItems:'center', justifyContent:'center', padding:5, borderRightWidth:1,
    borderRightColor:'#F4EAD3', backgroundColor:'#665234'},
  conContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})
