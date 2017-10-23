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
    marginTop: 0
  },
  topacity: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5, backgroundColor: '#665234'},

  rmcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4EAD3',
    marginBottom: -30
  },
  rmitem: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(240,177,104,1)',
    zIndex: 100,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.2
  },
  rmroot: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8F7140',
    zIndex: 100
  }
  ,
})
