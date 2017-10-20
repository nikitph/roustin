import React, { Component } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import  Header   from '../Components/Header'
import  ButtonRow   from '../Components/ButtonRow'
import { dbService, mapp } from '../Services/Firebase'
import { SegmentedControls } from 'react-native-radio-buttons'
import { Images, Metrics } from '../Themes'
import * as Animatable from 'react-native-animatable'



import * as _ from 'lodash'
const usr = mapp.auth();


// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DashboardStyle'

class Dashboard extends Component {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,

  };
  constructor (props) {
    super(props);
    this.onPressOne.bind(this);
    this.onPressTwo.bind(this);
  }

  onPressOne(nav) {
  nav.navigate('BuyItem');
}

  onPressTwo(nav) {
  nav.navigate('SellItemScreen');
}



  render () {
    this.props.items && console.log(Object.values(this.props.items).filter(val=>val.sellerId==usr.currentUser.uid && !val.sold));
    let length = this.props.items ? Object.values(this.props.items).filter(val=>val.sellerId==usr.currentUser.uid && !val.sold).length : 0;
    let convos = this.props.conversations  && this.props.conversations.filter(msg=>
        msg.buyerId == usr.currentUser.uid ||  msg.sellerId == usr.currentUser.uid).length;
    return (

      <View style={{flex:1, backgroundColor: 'white'}}>
        <Header {...this.props.navigation}/>

        <View style={styles.container}>
          <Image source={{uri: usr.currentUser.photoURL}} style={{flex:0.3,height:200, alignItems:'center'}} resizeMode={'cover'}/>
          <View style={styles.conContainer}>
            <SegmentedControls
              options={ ["My Items","My Sold items","Items of Interest"] }
              onSelection={(onlyBuyerMessages)=> this.handleFieldChange(onlyBuyerMessages ,'onlyBuyerMessages') }
              selectedOption={ "Conversations with sellers" }
              optionContainerStyle={{flex:1}}
              containerBorderTint={'#F1E7D1'}
              containerBorderRadius={0}
              selectedBackgroundColor={'#665234'}
              tint={'#665234'}
              separatorTint={'#665234'}
            />
          </View>
          <Text style={styles.dbtextleft}>
            Hi {usr.currentUser.displayName}</Text>
          <View style={styles.imgContainer}>

          <View style={{flex:0.3, alignItems:'center'}}>
            <Animatable.Image animation='fadeInLeft' source={Images.buy}
                              style={{ height:80, width:80,alignItems:'center'}} resizeMode={'cover'}>


          </Animatable.Image>
          </View>
          <View style={{flex:0.7}}>
            <Text style={styles.dbtext}>
              You are interested in {length} items</Text>
          </View>

          </View>

          <View style={styles.imgContainer}>

            <View style={{flex:0.3, alignItems:'center'}}>
              <Animatable.Image animation='fadeInLeft' source={Images.sell}
                                style={{ height:80, width:80,alignItems:'center'}} resizeMode={'cover'}>


              </Animatable.Image>
            </View>
            <View style={{flex:0.7}}>
              <Text style={styles.dbtext}>
                {length} items out for sale</Text>
            </View>

          </View>
          <View style={styles.imgContainer}>

            <View style={{flex:0.3, alignItems:'center'}}>
              <Animatable.Image animation='fadeInLeft' source={Images.chats}
                                style={{ height:60, width:60,alignItems:'center'}} resizeMode={'cover'}>


              </Animatable.Image>
            </View>
            <View style={{flex:0.7}}>
              <Text style={styles.dbtext}>
                {convos} conversations </Text>
            </View>

          </View>

        </View>
        <ButtonRow onPressOne={this.onPressOne} onPressTwo={this.onPressTwo} nav={this.props.navigation}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let msgArray = state.itemchat.payload ? Object.values(state.itemchat.payload)
    .map(({sellerName, sellerId, sellerPic, itemKey, itemSummary, buyerName, buyerId, buyerPic})=>
      ({sellerName, sellerId, sellerPic, itemKey, itemSummary, buyerName, buyerId, buyerPic})) : [];
  return {
    items: state.item.payload,
    conversations: _.uniqWith(msgArray, _.isEqual)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
