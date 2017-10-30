import React from 'react'
import { ScrollView, Text, Animated, View, Dimensions, TouchableHighlight, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images, Metrics, Colors } from '../Themes'
import { RectangleButton } from 'react-native-button-component'
import { NavigationActions } from 'react-navigation'

// Styles
import styles from './Styles/ConfirmationPageStyle'

class ConfirmationPage extends React.Component {

  static navigationOptions = {
    mode: 'modal',
    header: null
  };

  componentWillMount () {
    this.setState({isOpen: true});
  }

  render () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Dashboard'})
      ]
    });
    return (
      <View style={styles.container}>
        <View style={{flex:0.2, backgroundColor:'#F1E7D1',    justifyContent: 'center',alignItems: 'center'}}>
        </View>
        <View style={styles.modal}>
          <Image source={Images.check} style={styles.topLogo}>
          </Image>
        </View>
        <View style={{flex:0.4, backgroundColor:'#F1E7D1', justifyContent: 'flex-start',alignItems: 'center'}}>
          <Text style={styles.text}>
            {this.props.navigation.state.params.message}
          </Text>
        </View>

        <TouchableHighlight onPress={() => {this.props.navigation.dispatch(resetAction)}} style={{flex:0.1, backgroundColor:'#665234',    justifyContent: 'center',
    alignItems: 'center'}}>
          <Text
            style={{fontFamily:'AvenirNext-UltraLight', fontSize:20, fontWeight:'200',alignSelf:'center',color:'white'}}>CLOSE</Text>
        </TouchableHighlight>

      </View>
    );
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage)
