import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: '#F1E7D1'
  },
  btnCtnr: {
    display: 'flex',
    flexDirection: 'row',
  },
  topacity: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5, borderRightWidth: 1,
    borderRightColor: '#F4EAD3', backgroundColor: '#665234'
  },
  conContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tstyle: {fontFamily: 'Avenir', textAlign: 'center', color: '#665234', fontSize: 16, fontWeight: '400', margin: 5}
  }
)
