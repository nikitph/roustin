import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container :{
    marginTop:5,
    backgroundColor: '#F1E7D1'
  },
  conContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent:'space-around',
    backgroundColor:'rgba(0,0,0,0.1)'
  },
  btnCtnr: {
    display: 'flex',
    flexDirection: 'row',
  },
  topacity:{flex:1, alignItems:'center', justifyContent:'center', padding:5, borderRightWidth:1,
    borderRightColor:'#F4EAD3', backgroundColor:'#665234'},
})
