import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import SearchBar from '../Components/SearchBar'
import Header from '../Components/Header'
import { mapp } from '../Services/Firebase'
import Icon from 'react-native-vector-icons/Ionicons'
import RadialMenu from '../Components/RadialMenu'
import * as _ from 'lodash'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html
// Styles
import styles from './Styles/NotificationsStyle'

const usr = mapp.auth();
const db = mapp.database();

class Notifications extends React.PureComponent {

  static navigationOptions = {
    header: null,
    gesturesEnabled: true,

  };

  renderItems (count) {
    return ["Clear Notifs", "Back"].map((i) => {
      return (
        <TouchableOpacity style={styles.rmitem} key={i}
                          onSelect={ () => {if (i == "Back")
                          this.props.navigation.navigate('Dashboard');
                          else
                          {
                              let itemRef =
      db.ref(`users/${usr.currentUser.uid}/notifications`)
        .remove();

                          }} }

                          onPress={() => {if (i == "Back")
                          this.props.navigation.navigate('Dashboard');
                          else
                          {
                              let itemRef =
      db.ref(`users/${usr.currentUser.uid}/notifications`)
        .remove();

                          }
                          }}
        >
          <Text
            style={{fontFamily:'Avenir', textAlign:'center', color:'#665234', fontSize:12, fontWeight:'400'}}>
            {i}</Text>
        </TouchableOpacity>
      );
    })
  }

  renderRoot () {
    return (
      <View style={styles.rmroot}>
        <Icon name="ios-menu" size={30} color="#F4EAD3" style={{marginTop:-20}}
        />
      </View>
    )
  }

  state = {
    dataObjects: [
      {title: 'First Title', description: 'First Description'},
      {title: 'Second Title', description: 'Second Description'},
      {title: 'Third Title', description: 'Third Description'},
      {title: 'Fourth Title', description: 'Fourth Description'},
      {title: 'Fifth Title', description: 'Fifth Description'},
      {title: 'Sixth Title', description: 'Sixth Description'},
      {title: 'Seventh Title', description: 'Seventh Description'}
    ],
  };

  renderRow ({item}, nav) {
    console.log(item);
    let isUserSeller = item.sellerId == usr.currentUser.uid;
    return (
      <TouchableOpacity style={styles.row} onPress={()=> nav.navigate('ItemChat',
      {item: item, itemKey: item.itemKey})}>
        <View style={{flex:0.2, alignItems:'flex-start'}}>
          <Image source={{uri: isUserSeller ? item.buyerPic : item.sellerPic}}
                 style={{borderRadius:20, height:40, width:40,alignItems:'center'}} resizeMode={'cover'}/>
        </View>
        <View style={{flex:0.7, alignItems:'flex-start'}}>
          <Text style={styles.label}>{isUserSeller ? item.buyerName : item.sellerName}
            has sent you a message regarding {item.itemSummary}</Text>
        </View>
        <View style={{flex:0.1, alignItems:'center'}}>
          <Icon name="ios-arrow-forward" size={32} color="rgba(116,100,78,1)"
          />
        </View>
      </TouchableOpacity>
    )
  }

  /* ***********************************************************
   * STEP 3
   * Consider the configurations we've set below.  Customize them
   * to your liking!  Each with some friendly advice.
   *************************************************************/
  // Render a header?
  renderHeader = () =>
    <SearchBar
      onSearch={() => {}}
      onCancel={() => {}}
      searchTerm='HELLO!!'
    />

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - There are no Notifications - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  handleFieldChange (value, fieldName) {
    let inputObj = {};
    inputObj[fieldName] = value == "Conversations with buyers";
    this.setState(inputObj);
  }

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Header {...navigation}/>
        <View style={styles.conContainer}>
          <TouchableOpacity
            style={styles.topacity}>
            <Text style={{color:'#F4EAD3', fontSize:14}}>
              Notifications
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.conversations}
          renderItem={item => this.renderRow(item, this.props.navigation)}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <View style={styles.rmcontainer}>
          <RadialMenu spreadAngle={120} startAngle={30}
                      onOpen={ this._onOpen }
                      onClose={ this._onClose }>

            { this.renderRoot() }
            { this.renderItems(3) }
          </RadialMenu>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let msgArray = state.notifications.payload ? Object.values(state.notifications.payload)
    .map(({sellerName, sellerId, sellerPic, itemKey, itemSummary, buyerName, buyerId, buyerPic}) =>
      ({sellerName, sellerId, sellerPic, itemKey, itemSummary, buyerName, buyerId, buyerPic})) : [];
  return {
    conversations: _.uniqWith(msgArray, _.isEqual)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
