import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F4EAD3'
  },
  conContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin:5,
    flex:0.25
  },
  topacity:{flex:1, alignItems:'center', justifyContent:'center', padding:5, borderRightWidth:1,
    borderRightColor:'#F4EAD3', backgroundColor:'#8F7140'},
  dbtext: {
    fontFamily:'AvenirNext-UltraLight', textAlign:'center', color:'#8F7140', fontSize:18, fontWeight:'300',
  marginLeft:20,  marginRight:20,marginTop:5},
  dbtextleft: {
    fontFamily:'AvenirNext-UltraLight', textAlign:'left', color:'#8F7140', fontSize:18, fontWeight:'300',
    marginLeft:20,  marginRight:20,marginTop:10},

    rmcontainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F4EAD3',
      marginBottom:-30
    },
    rmitem: {
      height: 60,
      width: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(240,177,104,90)',
      zIndex:100,
      shadowColor:'black',
      shadowRadius:5,
      shadowOffset:{width: 10, height:10},
      shadowOpacity:0.2
    },
    rmroot: {
      height: 60,
      width: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#8F7140',
      zIndex:100
    }
  ,
  btnCtnr: {
    display: 'flex',
    flexDirection: 'row',
  }

})
