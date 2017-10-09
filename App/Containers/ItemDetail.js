import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ItemDetailStyle'
import { dbService, mapp } from '../Services/Firebase'
import { RectangleButton } from 'react-native-button-component'
import DropdownAlert from 'react-native-dropdownalert'
import Header from '../Components/Header'

class ItemDetail extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,

  };

  constructor(props: Object) {
    super(props);

    //this.submitFunc.bind(this);
  }

  render () {
    const { navigation } = this.props;
    console.log(navigation);
    const { item } = navigation.state.params.item;
    console.log(item);

    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <Header {...navigation}/>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop:5}}>

            <Image source={{uri: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'}}
                   style={{
                                 padding: 10,
                                 width:100,
                                 height: 100,
                               }} resizeMode={'cover'}/>

            <Image source={{uri: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'}}
                   style={{
                                 padding: 10,
                                 width:100,
                                 height: 100,
                               }} resizeMode={'cover'}/>

            <Image source={{uri: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'}}
                   style={{
                                 padding: 10,
                                 width:100,
                                 height: 100,
                               }} resizeMode={'cover'}/>
        </View>
        <ScrollView style={styles.container}>
          <Text>{item.itemSummary}
          {item.details}
          {item.price}
            {item.negotiable}</Text>
        </ScrollView>
        <View style={styles.btnCtnr}>
            <TouchableOpacity onPress={this._onPress} style={{flex:1, backgroundColor:'blue', height:75}}>
                <Text style={styles.label}>{item.itemSummary}</Text>
            </TouchableOpacity>
        </View>
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          showCancel={true}
          translucent={true}
          errorColor={'rgba(250,50,50,1)'}
          closeInterval={6000}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail)
