import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Header from '../Components/Header'
import ButtonRow from '../Components/ButtonRow'
import { mapp } from '../Services/Firebase'
import { Images } from '../Themes'
import * as Animatable from 'react-native-animatable'
import RadialMenu from '../Components/RadialMenu'
import Icon from 'react-native-vector-icons/Ionicons'
import * as _ from 'lodash'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from './Styles/DashboardStyle'
const usr = mapp.auth();

class Dashboard extends Component {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,

  };

  constructor (props) {
    super(props);
    this.onPressOne.bind(this);
    this.onPressTwo.bind(this);
    this._onOpen = this._onOpen.bind(this);
    this._onClose = this._onClose.bind(this);
  }

  onPressOne (nav) {
    nav.navigate('BuyItem');
  }

  onPressTwo (nav) {
    nav.navigate('SellItemScreen',{});
  }
  componentWillMount() {
    this.setState({ output: "" });
  }

  _onOpen() {
    this.setState({
      output: 'on menu open'
    })
  }

  _onClose() {
    this.setState({
      output: 'on menu close'
    })
  }

  renderItems(count) {
    return ["My Items","My Sold Items","Items buying"].map((i) => {
      return (
        <TouchableOpacity style={styles.rmitem} key={i}
              onSelect={ () => {this.props.navigation.navigate('MyItems')} }
                          onPress={() => {
                          this.props.navigation.navigate('MyItems')}}
        >
          <Text
            style={{fontFamily:'Avenir', textAlign:'center', color:'#665234', fontSize:12, fontWeight:'400'}}>
            {i}</Text>
        </TouchableOpacity>
      );
    })
  }

  renderRoot() {
    return (
      <View style={styles.rmroot}>
        <Icon name="ios-menu" size={30} color="#F4EAD3" style={{marginTop:-20}}
            />
      </View>
    )
  }

  render () {
    let length = this.props.items ? Object.values(this.props.items).filter(val => val.sellerId == usr.currentUser.uid && !val.sold).length : 0;
    let convos = this.props.conversations && this.props.conversations.filter(msg =>
      msg.buyerId == usr.currentUser.uid || msg.sellerId == usr.currentUser.uid).length;
    return (

      <View style={{flex:1, backgroundColor: 'white'}}>
        <Header {...this.props.navigation}/>

        <View style={styles.container}>
          <Image source={{uri: usr.currentUser.photoURL}} style={{flex:0.3,height:200, alignItems:'center'}}
                 resizeMode={'cover'}/>
          <Text style={styles.dbtextleft}>
            Hi {usr.currentUser.displayName},</Text>
          {/*
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
           */}

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
        <View style={styles.rmcontainer}>
          <RadialMenu spreadAngle={120} startAngle={30}
                      onOpen ={ this._onOpen }
                      onClose={ this._onClose } >

            { this.renderRoot() }
            { this.renderItems(3) }
          </RadialMenu>
        </View>
        <ButtonRow onPressOne={this.onPressOne} onPressTwo={this.onPressTwo} nav={this.props.navigation}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let msgArray = state.itemchat.payload ? Object.values(state.itemchat.payload)
    .map(({sellerName, sellerId, sellerPic, itemKey, itemSummary, buyerName, buyerId, buyerPic}) =>
      ({sellerName, sellerId, sellerPic, itemKey, itemSummary, buyerName, buyerId, buyerPic})) : [];
  return {
    items: state.item.payload,
    conversations: _.uniqWith(msgArray, _.isEqual)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
