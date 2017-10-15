import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Switch } from 'react-native'
import { connect } from 'react-redux'
import  SearchBar  from '../Components/SearchBar'
import Header from '../Components/Header'
import { dbService, mapp } from '../Services/Firebase'

const usr = mapp.auth();

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/BuyConversationsStyle'
import * as _ from 'lodash'

class BuyConversations extends React.PureComponent {
  static navigationOptions = {
    header: null,
    gesturesEnabled: true,

  };
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
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
    onlyBuyerMessages: false
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}, nav, onlyBuyerMessages) {
    console.log(item);
    return (
      <TouchableOpacity style={styles.row} onPress={()=> nav.navigate('ItemChat',
      {item: item, itemKey: item.itemKey})}>
        <Text style={styles.boldLabel}>{item.buyerName}</Text>
        <Text style={styles.label}>{item.itemSummary}</Text>
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
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

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
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop:5}}>
            <Text> From Buyers </Text>

          <Switch
            onValueChange={(value) => {this.setState({onlyBuyerMessages: value}); }}
            value={this.state.onlyBuyerMessages}
            onTintColor={'#00adf5'}
          />

          <Text> From Sellers </Text>

        </View>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.conversations.filter(msg=> { console.log(msg);
            return this.state.onlyBuyerMessages ? msg.buyerId == usr.currentUser.uid :  msg.sellerId == usr.currentUser.uid
          })}
          renderItem={item => this.renderRow(item, this.props.navigation, this.state.onlyBuyerMessages)}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyConversations)
