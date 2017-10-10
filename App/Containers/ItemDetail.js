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
    const { item } = navigation.state.params.item;

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
          <View style={{flex:0.2, alignItems:'center', justifyContent:'center', backgroundColor:'#665234'}}>
            <Image source={{uri: item.sellerPic}}
                   style={{borderRadius:20, height:40, width:40,alignItems:'center'}} resizeMode={'cover'}/>
          </View>
          <View style={{flex:0.8}}>
            <RectangleButton
              onPress={()=>this.props.navigation.navigate('ItemChat')}
              text="CONTACT SELLER"
              type="primary"
              height={75}
              backgroundColors={['#665234', '#514128']}
              gradientStart={{ x: 0.5, y: 1 }}
              gradientEnd={{ x: 1, y: 1 }}>
            </RectangleButton>
          </View>
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
