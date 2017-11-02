import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, Image, View, Text, TextInput, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import DropdownAlert from 'react-native-dropdownalert'
import { RectangleButton } from 'react-native-button-component'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SignUpDetailsActions from '../Redux/SignUpDetailsRedux'
// Styles
import styles from './Styles/SignUpDetailsScreenStyle'
import PhotoUpload from '../Components/PhotoUpload'
import { mapp } from '../Services/Firebase'

const db = mapp.database();
const usr = mapp.auth();


class SignUpDetailsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  props: SignUpDetailsScreenProps;

  constructor (props: SignUpDetailsScreenProps) {
    super(props);
    this.showAlert = this.showAlert.bind(this);

    this.state = {
      displayName: '',
      buttonstate: props.fetching ? "fetching" : "ready",
      modal: false,
      profileImage:'',
    }
  }

  handlePressSignUpDetails = (state) => {
    const {profileImage, displayName} = state;
    if(profileImage)
    {
      this.props.attemptSignUpDetails(profileImage, displayName, this.showAlert, this.props.navigation, this.props.uid);
    }
  };

  showAlert(type,title,message) {
    this.dropdown.alertWithType(type, title, message);
  };

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        db.ref(`users/${usr.currentUser.uid}/location`)
          .set({latitude: position.coords.latitude, longitude: position.coords.longitude});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render () {
    const props = this.props;
    let fetch = props.fetching ? "fetching" : "ready";

    return (
      <ScrollView style={{height:Metrics.screenHeight}}>
        <KeyboardAvoidingView behavior='height'>
          <View style={{flex:1}}>
            <Image source={Images.loginbg} style={{flex:1}} width={Metrics.screenWidth} blurRadius={10}>
              <View style={{flex:0.3, justifyContent:'center', alignItems:'flex-end'}}>
                <Animatable.Image animation='fadeIn' source={Images.roustin} style={[styles.topLogo]}/>
              </View>
              <View
                style={{flex:0.4, backgroundColor:'rgba(247,237,212,0.8)', margin:20,borderRadius:10, flexDirection:'row' }}>
                <View style={{flexDirection:'column', flex:1}}>
                  <View style={{flex:0.1}}>
                    <Text style={[styles.header]}> Your Details </Text>
                  </View>
                  <View style={{flex:0.7, flexDirection:'row'}}>
                    <View style={{flex:1}}>
                      <View style={styles.container}>
                        <View style={styles.form}>
                          <PhotoUpload
                            onPhotoSelect={avatar => {
                             if (avatar) {
                                   this.setState({profileImage : avatar});
                                   console.tron.log(this.state);
                                 }   }}>
                            <Image
                              style={{
                                 paddingVertical: 10,
                                 width: 100,
                                 height: 100,
                                 borderRadius: 50
                               }}
                              resizeMode='cover'
                              source={{
                                       uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                                     }}/>
                          </PhotoUpload>
                          <Text style={{alignSelf:'center'}}>upload profile image</Text>
                          <View style={styles.row}>
                            <TextInput
                              value={this.state.displayName}
                              keyboardType='default'
                              returnKeyType='next'
                              autoCapitalize='none'
                              autoCorrect={false}
                              underlineColorAndroid='transparent'
                              placeholder={'Set Display Name'}
                              onChangeText={(displayName)=> this.setState({displayName})}
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
                      buttonState={fetch}
                      states={{
                              ready: {
                                onPress: () => {this.handlePressSignUpDetails(this.state)},
                                text: 'SUBMIT',
                              },
                              fetching: {
                                spinner: true,
                                text: 'One sec...',
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

type SignUpDetailsScreenProps = {
  dispatch: PropTypes.func,
  fetching: PropTypes.boolean,
  attemptSignUpDetails: PropTypes.func,
  error: PropTypes.object,
  uid: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.signupdetails.fetching,
    uid: state.signup.payload.uid
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSignUpDetails: (image, displayName, alertfunc, nav, uid) =>
      dispatch(SignUpDetailsActions.signUpDetailsRequest(image, displayName, alertfunc, nav, uid))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpDetailsScreen)
