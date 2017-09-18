import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, Image, View, Text, TextInput, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import { RectangleButton } from 'react-native-button-component'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions from '../Redux/LoginRedux'
// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  props: LoginScreenProps;

  constructor (props: LoginScreenProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      invalidEmail: false,
      invalidPassword: false,
      incorrectPassword: false,
      noMatch: false,
      buttonstate: props.fetching? "fetching" : "ready"
    }
  }

  formValidation (result) {

    // if the result is true, log the user in
    const {code} = result;

    code === 'auth/invalid-email'
      ? this.setState({invalidEmail: true})
      : this.setState({invalidEmail: false})

    code === 'auth/weak-password'
      ? this.setState({invalidPassword: true})
      : this.setState({invalidPassword: false})

    code === 'auth/wrong-password'
      ? this.setState({incorrectPassword: true})
      : this.setState({incorrectPassword: false})

    code === 'auth/user-not-found'
      ? this.setState({noMatch: true})
      : this.setState({noMatch: false})

  }

  submitForm (state) {
    const {email, password} = state;
    signInWithEmailAndPassword(email, password, this.formValidation.bind(this));
  }

  handlePressLogin = () => {
    const {email, password} = this.state
    this.props.attemptLogin(email, password)
  }

  render () {
    const props = this.props;
    const {globalStyles, auth, app} = props;
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
                    <Text style={[styles.header]}> Login </Text>
                  </View>
                  <View style={{flex:0.7, flexDirection:'row'}}>
                    <View style={{flex:0.1, justifyContent:'center', alignItems:'center'}}>
                      <Icon name="ios-arrow-back" size={50} color="#900"
                            onPress={()=>this.props.navigation.navigate('WalkThroughScreen')}
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


                        </View>

                        { this.props.error && <Text>Invalid email address </Text> }

                      </View>

                    </View>
                  </View>
                  <View style={{flex:0.2}}>
                    <RectangleButton
                      onPress={() => {this.handlePressLogin()}}
                      type="primary"
                      backgroundColors={['#665234', '#514128']}
                      gradientStart={{ x: 0.5, y: 1 }}
                      gradientEnd={{ x: 1, y: 1 }}
                      buttonState={this.state.buttonstate}
                      states={{
                              ready: {
                                onPress: () => {this.handlePressLogin()},
                                text: 'SIGN IN',
                              },
                              fetching: {
                                spinner: true,
                                text: 'Signing In...',
                              },
                            }}>
                    </RectangleButton></View>
                </View>
              </View>
            </Image>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

type LoginScreenProps = {
  dispatch: PropTypes.func,
  fetching: PropTypes.boolean,
  attemptLogin: PropTypes.func,
  error: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (email, password) => dispatch(LoginActions.loginRequest(email, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
