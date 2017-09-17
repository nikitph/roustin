// @flow

import {ScrollView, Text, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

// Styles
import styles from './Styles/WalkThroughScreenStyle'

// I18n
import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import RoundedButton from '../Components/RoundedButton'
import {Images, Metrics, Colors} from '../Themes'


class WalkThroughScreen extends React.Component {

  render() {
    return (
      <View style={{flex:1}}>
        <IndicatorViewPager
          style={{flex:1}}
          indicator={this._renderDotIndicator()}
        >
          <View style={{backgroundColor:'#F7EDD3',justifyContent:'center', alignItems:'center'}}>
            <Animatable.Image animation='fadeIn' source={Images.logo} style={[styles.topLogo]}/>
            <Text
              style={{fontFamily:'American Typewriter', textAlign:'center', color:'#8F7140', fontSize:16, marginLeft:25,  marginRight:25,  marginTop:-20}}>
              Thank you for choosing Roust.in. Lets do a quick walkthrough of how to use it.</Text>

          </View>
          <View style={{backgroundColor:'#F7EDD3',justifyContent:'center', alignItems:'center'}}>
            <Animatable.Image animation='fadeIn' source={Images.basket} style={[styles.cart]}/>
            <Text
              style={{fontFamily:'American Typewriter', textAlign:'center', color:'#8F7140', fontSize:16, marginLeft:25,  marginRight:25,  marginTop:-50}}>
              Click buy to see everything on sale. Select to see details and contact seller</Text>
          </View>
          <View style={{backgroundColor:'#F7EDD3',justifyContent:'center', alignItems:'center'}}>
            <Animatable.Image animation='fadeIn' source={Images.tilttag} style={[styles.cart]}/>
            <Text
              style={{fontFamily:'American Typewriter', textAlign:'center', color:'#8F7140', fontSize:16, marginLeft:25,  marginRight:25,  marginTop:-50}}>
              Click sell. Enter details and your item is out for sale.</Text>
          </View>
          <View style={{backgroundColor:'#F7EDD3',justifyContent:'center', alignItems:'center'}}>
            <Animatable.Image animation='fadeIn' source={Images.chats} style={[styles.cart]}/>
            <Text
              style={{fontFamily:'American Typewriter', textAlign:'center', color:'#8F7140', fontSize:16, marginLeft:25,  marginRight:25,  marginTop:-75}}>
              Chat with buyers/sellers in app. Settle your transaction offline. Done!</Text>


            <View style={{marginTop:75}}>

              <RoundedButton onPress={()=>this.props.navigation.navigate('LaunchScreen')
}>Sign In</RoundedButton>
            </View>

          </View>
        </IndicatorViewPager>


      </View>
    );
  }

  _renderTitleIndicator() {
    return <PagerTitleIndicator titles={['one', 'two', 'three']}/>;
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={4} dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 10 >> 1,
        backgroundColor: 'transparent',
        borderColor:'#B72219',
        borderWidth:1,
        margin: 10 >> 1}}
                              selectedDotStyle={{width: 10,
        height: 10,
        borderRadius: 10 >> 1,
        backgroundColor: '#B72219',
        margin: 10 >> 1}}

                              style={{ position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'}}
    />;
  }

  _renderTabIndicator() {
    let tabs = [{
      text: 'Home',
      iconSource: require('../Images/buy.png'),
      selectedIconSource: require('../Images/buy.png')
    }, {
      text: 'Message',
      iconSource: require('../Images/buy.png'),
      selectedIconSource: require('../Images/buy.png')
    }, {
      text: 'Profile',
      iconSource: require('../Images/buy.png'),
      selectedIconSource: require('../Images/buy.png')
    }];
    return <PagerTabIndicator tabs={tabs}/>;
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WalkThroughScreen)
