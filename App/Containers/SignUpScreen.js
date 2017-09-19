import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, Image, View, Text, TextInput, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import DropdownAlert from 'react-native-dropdownalert'
import { RectangleButton } from 'react-native-button-component'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SignUpActions from '../Redux/SignUpRedux'
// Styles
import styles from './Styles/SignUpScreenStyle'

class SignUpScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  props: SignUpScreenProps;

  constructor (props: SignUpScreenProps) {
    super(props);
    this.showAlert = this.showAlert.bind(this);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      passwordMismatch: false,
      invalidEmail: false,
      invalidPassword: false,
      incorrectPassword: false,
      noMatch: false,
      buttonstate: props.fetching ? "fetching" : "ready",
    }
  }


  handlePressSignUp = (state) => {
    const {email, password, confirmPassword} = state;
    if(password == confirmPassword)
    {
      this.setState({passwordMismatch:false});
      this.props.attemptSignUp(email, password,this.showAlert);
    }
    else
    {
      this.setState({passwordMismatch:true})
    }
  };

  showAlert(type,title,message) {
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
                style={{flex:0.4, backgroundColor:'rgba(247,237,212,0.8)', margin:20,borderRadius:10, flexDirection:'row' }}>
                <View style={{flexDirection:'column', flex:1}}>
                  <View style={{flex:0.1}}>
                    <Text style={[styles.header]}> SignUp </Text>
                  </View>
                  <View style={{flex:0.7, flexDirection:'row'}}>
                    <View style={{flex:0.1, justifyContent:'center', alignItems:'center'}}>
                      <Icon name="ios-arrow-back" size={50} color="#900"
                            onPress={()=>props.navigation.navigate('WalkThroughScreen')}
                      />
                    </View>
                    <View style={{flex:0.9}}>
                      <View style={styles.container}>
                        <View style={styles.form}>
                          <View style={styles.row}>
                            <TextInput
                              value={this.state.email}
                              keyboardType='default'
                              returnKeyType='next'
                              autoCapitalize='none'
                              autoCorrect={false}
                              underlineColorAndroid='transparent'
                              placeholder={'Email Address'}
                              onChangeText={(email)=> this.setState({email})}
                              onSubmitEditing={() => this.refs.password.focus()}
                            />

                          </View>

                          <View style={styles.row}>
                            <TextInput
                              ref='password'
                              value={this.state.password}
                              keyboardType='default'
                              returnKeyType='go'
                              autoCapitalize='none'
                              autoCorrect={false}
                              secureTextEntry
                              underlineColorAndroid='transparent'
                              placeholder={'Password'}
                              onChangeText={(password)=> this.setState({password})}
                            />
                          </View>

                          <View style={styles.row}>
                            <TextInput
                              ref='password'
                              value={this.state.confirmPassword}
                              keyboardType='default'
                              returnKeyType='go'
                              autoCapitalize='none'
                              autoCorrect={false}
                              secureTextEntry
                              underlineColorAndroid='transparent'
                              placeholder={'Confirm Password'}
                              onChangeText={(confirmPassword)=> this.setState({confirmPassword})}
                            />
                          </View>
                        </View>

                        {this.state.passwordMismatch && this.showAlert('error','Error','The passwords do not match') }

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
                                onPress: () => {this.handlePressSignUp(this.state)},
                                text: 'SIGN UP',
                              },
                              fetching: {
                                spinner: true,
                                text: 'Signing Up...',
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

type SignUpScreenProps = {
  dispatch: PropTypes.func,
  fetching: PropTypes.boolean,
  attemptSignUp: PropTypes.func,
  error: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    fetching: state.signup.fetching,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSignUp: (email, password, alertfunc) => dispatch(SignUpActions.signUpRequest(email, password, alertfunc))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
