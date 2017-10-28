import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, Image, View, Text, TextInput, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import DropdownAlert from 'react-native-dropdownalert'
import { RectangleButton } from 'react-native-button-component'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ResetPasswordActions from '../Redux/ResetPasswordRedux'
// Styles
import styles from './Styles/ResetPasswordScreenStyle'

class ResetPasswordScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  props: ResetPasswordScreenProps;

  constructor (props: ResetPasswordScreenProps) {
    super(props);
    this.showAlert = this.showAlert.bind(this);

    this.state = {
      email: '',
      buttonstate: props.fetching ? "fetching" : "ready",
    }
  }

  handlePressResetPassword = (state) => {
    const {email} = state;
    this.props.attemptResetPassword(email, this.showAlert);
  };

  showAlert (type, title, message) {
    this.dropdown.alertWithType(type, title, message);
  };

  render () {
    const props = this.props;
    return (
      <ScrollView style={{height:Metrics.screenHeight}}>
        <KeyboardAvoidingView behavior='height'>
          <View style={{flex:1}}>
            <Image source={Images.loginbg} style={{flex:0.9}} width={Metrics.screenWidth} blurRadius={10}>
              <View style={{flex:0.3, justifyContent:'center', alignItems:'flex-end'}}>
                <Animatable.Image animation='fadeIn' source={Images.roustin} style={[styles.topLogo]}/>
              </View>
              <View
                style={{flex:0.4, backgroundColor:'rgba(247,237,212,0.55)', margin:20,borderRadius:10, flexDirection:'row' }}>
                <View style={{flexDirection:'column', flex:1}}>
                  <View style={{flex:0.1}}>
                    <Text style={[styles.header]}> Reset Password </Text>
                  </View>
                  <View style={{flex:0.7, flexDirection:'row'}}>
                    <View style={{flex:0.1, justifyContent:'center', alignItems:'center'}}>
                      <Icon name="ios-arrow-back" size={50} color="#900"
                            onPress={()=>props.navigation.navigate('LoginScreen')}
                      />
                    </View>
                    <View style={{flex:0.9}}>
                      <View style={styles.container}>
                        <View style={styles.form}>
                          <View style={styles.row}>
                            <View style={{flex:0.1}}>
                              <Icon name="ios-mail" size={24} color="rgba(0,0,0,0.5)"
                              />
                            </View>
                            <View style={{flex:0.9}}>
                              <TextInput
                                value={this.state.email}
                                keyboardType='default'
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                placeholder={'Email Address'}
                                onChangeText={(email)=> this.setState({email})}
                              />
                            </View>

                          </View>
                        </View>
                      </View>

                    </View>
                  </View>
                  <View style={{flex:0.2}}>
                    <RectangleButton
                      type="primary"
                      backgroundColors={['#665234', '#514128']}
                      gradientStart={{ x: 0.5, y: 1 }}
                      gradientEnd={{ x: 1, y: 1 }}
                      buttonState={this.state.buttonstate}
                      states={{
                              ready: {
                                onPress: () => {this.handlePressResetPassword(this.state)},
                                text: 'SEND PASSWORD RESET EMAIL',
                              },
                              fetching: {
                                spinner: true,
                                text: 'Sending...',
                              },
                            }}>
                    </RectangleButton></View>
                </View>
              </View>
            </Image>
          </View>
        </KeyboardAvoidingView>
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          showCancel={true}
          translucent={true}
          errorColor={'rgba(250,50,50,1)'}
          closeInterval={6000}
        />
      </ScrollView>
    )
  }
}

type ResetPasswordScreenProps = {
  dispatch: PropTypes.func,
  attemptResetPassword: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    fetching: state.reset.fetching,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptResetPassword: (email, alertfunc) => dispatch(ResetPasswordActions.resetPasswordRequest(email, alertfunc))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen)
