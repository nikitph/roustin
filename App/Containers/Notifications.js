import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Switch } from 'react-native'
import { connect } from 'react-redux'
import  SearchBar  from '../Components/SearchBar'
import Header from '../Components/Header'
import { dbService, mapp } from '../Services/Firebase'
import { RectangleButton } from 'react-native-button-component'
import Icon from 'react-native-vector-icons/Ionicons'
import { SegmentedControls } from 'react-native-radio-buttons'

const usr = mapp.auth();
import * as _ from 'lodash'


// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/NotificationsStyle'

class Notifications extends React.PureComponent {

  static navigationOptions = {
    header: null,
    gesturesEnabled: true,

  };

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
    onlyBuyerMessages: true
  }


  renderRow ({item}, nav, onlyBuyerMessages) {
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
          <Text style={styles.label}>{isUserSeller? item.buyerName : item.sellerName} has sent you a message regarding {item.itemSummary}</Text>
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
    <Text style={styles.label}> - There are no relevant conversations - </Text>

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
    console.log(this.state.onlyBuyerMessages);
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header {...navigation}/>
        <View style={styles.conContainer}>
          <SegmentedControls
            options={ ["Notifications"] }
            selectedOption={ "Notifications" }
            optionContainerStyle={{flex:1}}
            containerBorderTint={'#665234'}
            containerBorderRadius={0}
            selectedBackgroundColor={'#665234'}
            tint={'#665234'}
            separatorTint={'#665234'}
          />
        </View>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.conversations}
          renderItem={item => this.renderRow(item, this.props.navigation, this.state.onlyBuyerMessages)}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let msgArray = Object.values(state.itemchat.payload)
    .map(({sellerName, sellerId, sellerPic, itemKey, itemSummary, buyerName, buyerId, buyerPic})=>
      ({sellerName, sellerId, sellerPic, itemKey, itemSummary, buyerName, buyerId, buyerPic}));
  return {
    conversations: _.uniqWith(msgArray, _.isEqual)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
