import React from 'react'
import { View, Text, FlatList, Image,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { mapp } from '../Services/Firebase'
import Header from '../Components/Header'
import  SearchBar  from '../Components/SearchBar'


const storage = mapp.storage();
const usr = mapp.auth();
const db = mapp.database();

// Styles
import styles from './Styles/MyItemsStyle'

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.nav.navigate('ItemDetail',{item:this.props.item, itemKey: this.props.itemKey})
  };

  render() {
    return (
      <TouchableOpacity style={styles.row} onPress={this._onPress}>
        <Image source={{uri : this.props.uri}} resizeMode={'cover'}
               style={{height:100, alignItems:'stretch', backgroundColor:'transparent', borderWidth:0.5, borderColor:'rgba(0,0,0,0.2)'}}
        >
          <Text style={styles.label}>{this.props.itemSummary}</Text>
        </Image>
      </TouchableOpacity>
    )
  }
}


class MyItems extends React.PureComponent {
  static navigationOptions = {
    header: null,
    gesturesEnabled: true,

  };


  renderRow (item, nav) {
    console.log(item.item);
    let uri = item.item[1].eventImageOneUrl ? item.item[1].eventImageOneUrl : 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png';
    if(item.item[1].sellerId != usr.currentUser.uid)
      return;
    return <MyListItem
      uri={uri}
      itemSummary={item.item[1].itemSummary}
      item={item.item[1]}
      nav={nav}
      itemKey={item.item[0]}
    />
  }

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
    const { navigation, items } = this.props;
    console.log(this.props.items);

    return (
      <View style={styles.container}>
        <Header {...navigation}/>

        <FlatList
          contentContainerStyle={styles.listContent}
          data={items}
          extraData={this.props.navigation}
          renderItem={item => this.renderRow(item, this.props.navigation)}
          numColumns={3}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: Object.entries(state.item.payload)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyItems)
