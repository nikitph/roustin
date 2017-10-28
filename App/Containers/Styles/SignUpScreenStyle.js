import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.5,
  },
  cart: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.35,
    marginTop: -140
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection:'column',
    justifyContent:'center',
  },
  header : {
    color: '#665234',
    alignSelf: 'center',
    fontFamily: 'AvenirNext-UltraLight',
    fontSize:28,
    marginBottom: 20
  },
  errorText : {
    color: 'red'
  },
  signIn : {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40
  },
  signInLink : {
    marginLeft: 1,
    color: 'white'
  },
  form: {
    backgroundColor: Colors.clear,
    marginLeft: 10,
    marginRight: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: Metrics.smallMargin,
    margin: 5,
    backgroundColor:'rgba(0,0,0,0.1)',
    paddingLeft:15
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal,
    fontFamily: 'Avenir',

  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    marginTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.bloodOrange,
    backgroundColor: Colors.transparent,
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: Colors.ember,
  },
});

