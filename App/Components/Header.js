import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import styles from './Styles/HeaderStyle'
import { Images } from '../Themes'
import { mapp } from '../Services/Firebase'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation'
import { RectangleButton, RoundButton } from 'react-native-button-component'


const usr = mapp.auth();

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'LoginScreen'})
  ]
});

export default class Header extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    console.log(this.props);
    console.log(usr.currentUser);
    return (
      <View style={styles.row}>
        <View style={styles.container}>

          <View style={{flex:0.3, alignItems:'center'}}>
            <Image source={{uri: usr.currentUser.photoURL}}
                   style={{borderRadius:20, height:40, width:40,alignItems:'center'}} resizeMode={'cover'}/>
          </View>

          <Image source={Images.logo} style={{flex:0.4,height:30, alignItems:'center'}} resizeMode={'contain'}/>

          <View style={{flex:0.3, alignItems:'center'}}>
            <Icon name="ios-log-out-outline" size={25} color="#665234"/>
          </View>

        </View>
        <View style={styles.container}>
          <View style={{flex:0.3, alignItems:'center', flexDirection:'row',justifyContent:'space-around'}}>
            <Text>Hi {usr.currentUser.displayName}</Text>
          </View>

          <View style={{flex:0.3, alignItems:'center'}}>
            <Icon name="ios-log-out-outline" size={25} color="#665234"/>
          </View>

          <View style={{flex:0.3, alignItems:'center'}}>
            <Icon name="ios-log-out-outline" size={25} color="#665234" onPress={()=>{
              usr.signOut();
              this.props.dispatch(resetAction);
            }}/>
          </View>

        </View>
        <View style={styles.conContainer}>
          <View style={{flex:0.3, backgroundColor:'rgba(0,0,0,0.4'}}>
            <RectangleButton
              onPress={()=>this.submitFunc()}
              text="My Active Items"
              type="primary"
              height={30}
              backgroundColors={['#1F1C18', '#8E0E00']}
              gradientStart={{ x: 0.5, y: 1 }}
              gradientEnd={{ x: 1, y: 1 }}>
            </RectangleButton>
          </View>

          <View style={{flex:0.4, alignItems:'center'}}>
            <Text>Item Input Form</Text>
          </View>

          <View style={{flex:0.3, alignItems:'center'}}>
            <RectangleButton
              onPress={()=>this.submitFunc()}
              text="My Sold Items"
              type="primary"
              height={30}
              backgroundColors={['#1F1C18', '#8E0E00']}
              gradientStart={{ x: 0.5, y: 1 }}
              gradientEnd={{ x: 1, y: 1 }}>
            </RectangleButton>
          </View>

        </View>

      </View>
    )
  }
}
