// @flow
// I18n
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// external libs
import * as Animatable from 'react-native-animatable'
// Styles
import styles from './Styles/WalkThroughScreenStyle'
import React, { Component } from 'react'
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager'
import RoundedButton from '../Components/RoundedButton'
import { Images, Metrics } from '../Themes'
import { RectangleButton } from 'react-native-button-component'
import AutoTypingText from 'react-native-auto-typing-text';


class WalkThroughScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render () {
    return (
      <View style={{flex:1}}>
        <Image source={Images.loginbg} style={{flex:1}} width={Metrics.screenWidth} blurRadius={10}>
          <View style={{flex:0.5, justifyContent:'center', alignItems:'flex-end'}}>
            <Animatable.Image animation='fadeIn' source={Images.roustin} style={[styles.topLogo]}/>
          </View>
          <View style={{flex:0.5, backgroundColor:'rgba(247,237,212,0.55)', margin:20,borderRadius:10 }}>

            <IndicatorViewPager
              style={{flex:1, width:Metrics.screenWidth-50}}
              indicator={this._renderDotIndicator()}
            >
              <View style={{backgroundColor:'transparent',justifyContent:'center', alignItems:'center'}}>
                <Animatable.Text animation="fadeIn"
                                 style={{fontFamily:'AvenirNext-UltraLight', textAlign:'center', color:'#8F7140', fontSize:28, fontWeight:'300', marginLeft:25,  marginRight:25,  marginTop:20}}>
                  Hi</Animatable.Text>

                <AutoTypingText
                  text={`Thank you for choosing Roust.in, your local marketplace. Swipe left for a quick walkthrough.`}
                  charMovingTime={60}
                  delay={750}
                  style={{fontFamily:'AvenirNext-UltraLight', textAlign:'center', color:'#8F7140', fontSize:20, fontWeight:'300', marginLeft:25,  marginRight:25,  marginTop:20}}>
                </AutoTypingText>

              </View>
              <View style={{backgroundColor:'transparent',justifyContent:'center', alignItems:'center'}}>
                <Animatable.Image animation='fadeIn' source={Images.basket} style={[styles.cart]}/>
                <Text
                  style={{fontFamily:'AvenirNext-UltraLight', textAlign:'center', color:'#8F7140', fontSize:18, fontWeight:'300', marginLeft:25,  marginRight:25,  marginTop:-20}}>
                  Click buy to see everything on sale near you. Select to see details and contact seller</Text>
              </View>
              <View style={{backgroundColor:'transparent',justifyContent:'center', alignItems:'center'}}>
                <Animatable.Image animation='fadeIn' source={Images.tilttag} style={[styles.cart]}/>
                <Text
                  style={{fontFamily:'AvenirNext-UltraLight', textAlign:'center', color:'#8F7140', fontSize:18, fontWeight:'300', marginLeft:25,  marginRight:25,  marginTop:-50}}>
                  Click sell. Enter details and your item is out for sale. Every user in a set radius near you will see the item.</Text>
              </View>
              <View style={{backgroundColor:'transparent',justifyContent:'center', alignItems:'center'}}>
                <Animatable.Image animation='fadeIn' source={Images.chats} style={[styles.cart, {marginTop:-190}]}/>
                <Text
                  style={{fontFamily:'AvenirNext-UltraLight', textAlign:'center', color:'#8F7140', fontSize:18, fontWeight:'300', marginLeft:25,  marginRight:25,  marginTop:-75}}>
                  Chat with buyers/sellers in app. Settle your transaction offline. Done!</Text>

              </View>
            </IndicatorViewPager>
          </View>
        </Image>
        <View
          style={{flexDirection:'row', alignItems:'flex-end', backgroundColor:'#F7EDD3'}}>
          <View style={{flex:0.5}}>
            <RectangleButton
              onPress={()=>this.props.navigation.navigate('SignUpScreen')}
              text="SIGN UP"
              type="primary"
              height={75}
              backgroundColors={['#665234', '#514128']}
              gradientStart={{ x: 0.5, y: 1 }}
              gradientEnd={{ x: 1, y: 1 }}>
            </RectangleButton>
          </View>
          <View style={{flex:0.5}}>

            <RectangleButton
              onPress={()=>this.props.navigation.navigate('LoginScreen')}
              text="LOGIN"
              type="primary"
              height={75}
              backgroundColors={['#BF9C65', '#CEA76A']}
              gradientStart={{ x: 0.5, y: 1 }}
              gradientEnd={{ x: 1, y: 1 }}
            >
            </RectangleButton>
          </View>
        </View>

      </View>
    );
  }

  _renderDotIndicator () {
    return <PagerDotIndicator pageCount={4} dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 10 >> 1,
        backgroundColor: 'transparent',
        borderColor:'#665234',
        borderWidth:1,
        margin: 10 >> 1}}
                              selectedDotStyle={{width: 10,
        height: 10,
        borderRadius: 10 >> 1,
        backgroundColor: '#665234',
        margin: 10 >> 1}}

                              style={{ position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'}}
    />;
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WalkThroughScreen)
