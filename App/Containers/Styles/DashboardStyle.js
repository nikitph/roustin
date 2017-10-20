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
  dbtext: {
    fontFamily:'AvenirNext-UltraLight', textAlign:'center', color:'#8F7140', fontSize:18, fontWeight:'300',
  marginLeft:20,  marginRight:20,marginTop:5},
  dbtextleft: {
    fontFamily:'AvenirNext-UltraLight', textAlign:'left', color:'#8F7140', fontSize:18, fontWeight:'300',
    marginLeft:20,  marginRight:20,marginTop:10},

})
