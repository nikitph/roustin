import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/HeaderStyle'
import { Images } from '../Themes'
import { mapp } from '../Services/Firebase'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation'
import { RectangleButton, RoundButton } from 'react-native-button-component'
import Badge from 'react-native-smart-badge'
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import * as _ from 'lodash'


const usr = mapp.auth();

const sunset = [
  'rgb(239, 235, 186)',
  'rgb(212, 222, 206)',
  'rgb(255, 229, 170)'
]

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'LoginScreen'})
  ]
});

const dashboardAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'Dashboard'})
  ]
});

class Header extends Component {
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
    return (
      <View style={styles.row}>
        <AnimatedLinearGradient customColors={sunset} speed={10000}/>
        <View style={styles.container}>

          <View style={{flex:0.3, alignItems:'center'}}>
            <Image source={{uri: usr.currentUser.photoURL}}
                   style={{borderRadius:20, height:40, width:40,alignItems:'center'}} resizeMode={'cover'}/>
          </View>

          <TouchableOpacity style={{flex:0.4,height:30, alignItems:'center'}} onPress={()=>{
              this.props.dispatch(dashboardAction);
            }}>
          <Image source={Images.logo} style={{flex:1,height:30, alignItems:'center'}} resizeMode={'contain'} />
          </TouchableOpacity>

          <View style={{flex:0.3, alignItems:'center'}}>
            <Icon name="ios-log-out-outline" size={25} color="#665234" onPress={()=>{
              usr.signOut();
              this.props.dispatch(resetAction);
            }}/>
          </View>

        </View>
        <View style={styles.container}>
          <View style={{flex:0.3, alignItems:'center', marginTop:5}}>
            <Icon name="ios-pricetags-outline" size={25} color="#665234" onPress={()=>{
             this.props.navigate('MyItems');
            }}/>
          </View>

          <View style={{flex:0.4, alignItems:'center'}}>
            <Icon name="ios-chatbubbles" size={25} color="#665234" onPress={()=>{
             this.props.navigate('BuyConversations');
            }}/>
          </View>

          <Animatable.View animation='shake' style={{flex:0.3, alignItems:'center',flexDirection:'row', justifyContent:'center'}}>
            <Icon name="ios-notifications-outline" size={25} color="#665234" onPress={()=>{
             this.props.navigate('Notifications');
            }}/>
            <Badge minWidth={12} minHeight={12} textStyle={{fontSize: 10,  color: 'white'}} style={{backgroundColor:'green',marginBottom:16, marginLeft:-5}}
            >
              {this.props.notifs.length}
            </Badge>
          </Animatable.View>

        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let notif = state.notifications.payload;
  let notifArray = notif ? Object.values(notif)
    .map(({sellerName, sellerId, itemKey, itemSummary})=>({sellerName, sellerId, itemKey, itemSummary})) : [];
  return {
    notifs: _.uniqWith(notifArray, _.isEqual)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
