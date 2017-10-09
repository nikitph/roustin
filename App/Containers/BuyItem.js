import React from 'react'
import { View, Text, FlatList, Image,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { mapp } from '../Services/Firebase'
import Header from '../Components/Header'
import  SearchBar  from '../Components/SearchBar'


const storage = mapp.storage();
const usr = mapp.auth();
const db = mapp.database();

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/BuyItemStyle'

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.nav.navigate('ItemDetail',{item:this.props.item})
  };

  render() {
    return (
      <TouchableOpacity style={styles.row} onPress={this._onPress}>
        <Image source={{uri : this.props.uri}} resizeMode={'cover'}
               style={{height:100, alignItems:'stretch', backgroundColor:'yellow', borderWidth:0.5, borderColor:'rgba(0,0,0,0.2)'}}
        >
          <Text style={styles.label}>{this.props.itemSummary}</Text>
        </Image>
      </TouchableOpacity>
    )
  }
}

class BuyItem extends React.PureComponent {
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
    ]
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow (item, nav) {
    console.log(nav);
let uri = item.eventImageOneUrl ? item.eventImageOneUrl : 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png';
    return <MyListItem
      uri={uri}
      itemSummary={item.itemSummary}
      item={item}
      nav={nav}
    />
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
  keyExtractor = (item, index) => index;

  _onPressItem = () => {
    /**
     HOW DO YOU PASS THE INFORMATION OF THE SELECTED USER TO THE ViewUser SCREEN??
     **/

      this.setState((state) => {
        return {navigation: this.props.navigation};
      });
    };

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
    let ref = db.ref("items");
    let obj = null;
    ref.on("value", function(snapshot) {
      obj = Object.values(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header {...navigation}/>

        <FlatList
          contentContainerStyle={styles.listContent}
          data={obj}
          extraData={this.props.navigation}
          renderItem={item => this.renderRow(item, this.props.navigation)}
          numColumns={3}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyItem)
