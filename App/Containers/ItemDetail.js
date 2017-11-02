import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ItemDeleteActions from '../Redux/ItemDeleteRedux'
// Styles
import styles from './Styles/ItemDetailStyle'
import { mapp } from '../Services/Firebase'
import { RectangleButton } from 'react-native-button-component'
import DropdownAlert from 'react-native-dropdownalert'
import Header from '../Components/Header'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import { NavigationActions } from 'react-navigation'

const usr = mapp.auth();


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
    const { item, itemKey } = navigation.state.params;
    const combItem = Object.assign({}, item,
      { buyerId: usr.currentUser.uid, buyerName: usr.currentUser.displayName, buyerPic: usr.currentUser.photoURL });
    let isSeller = item.sellerId == usr.currentUser.uid;

    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <Header {...navigation}/>
        <View style={styles.conContainer}>
          <TouchableOpacity
            style={styles.topacity}>
            <Text style={{color:'#F4EAD3', fontSize:14}}>
              Item Details
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop:5}}>

            <Image source={{uri: item.eventImageOneUrl || 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'}}
                   style={{
                                 padding: 10,
                                 width:100,
                                 height: 100,
                               }} resizeMode={'cover'}/>

            <Image source={{uri: item.eventImageTwoUrl || 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'}}
                   style={{
                                 padding: 10,
                                 width:100,
                                 height: 100,
                               }} resizeMode={'cover'}/>

            <Image source={{uri: item.eventImageThreeUrl || 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'}}
                   style={{
                                 padding: 10,
                                 width:100,
                                 height: 100,
                               }} resizeMode={'cover'}/>
        </View>
        <View style={styles.container}>
          <View style={{flex:0.4}}>
            <Image source={Images.buy}
                   style={{width:100, height:100, alignSelf:'center', resizeMode:'contain'}}>

            </Image>

            <Text
              style={{fontFamily:'AvenirNext-UltraLight', fontSize:20, fontWeight:'100',alignSelf:'center'}}>{item.itemSummary.toUpperCase()}</Text>

          </View>
          <View style={{flex:0.3}}>

            <Text
              style={{fontFamily:'AvenirNext-UltraLight', fontSize:16, fontWeight:'100',alignSelf:'center'}}>{item.details}</Text>
            <Text
              style={{fontFamily:'AvenirNext-UltraLight', fontSize:16, fontWeight:'100',alignSelf:'center'}}>
              The price of the item is {item.negotiable ? "Negotiable." : "Not Negotiable."}</Text>
          </View>
          <View style={{flex:0.3}}>

            <Animatable.Image source={Images.tag} animation="pulse" easing="ease-out" iterationCount={5}
                              style={{width:150, height:150, alignSelf:'center', resizeMode:'contain'}}>
              <Text
                style={{fontFamily:'AmericanTypewriter-Bold', fontSize:24, marginTop:75,fontWeight:'500',alignSelf:'center', backgroundColor:'transparent', color:'#CBB292'}}>price:{item.price}</Text>
            </Animatable.Image>
          </View>
        </View>
        <View style={styles.btnCtnr}>
          <TouchableOpacity style={{flex:0.2, justifyContent:'center', alignItems:'center',backgroundColor:'white'}}
                            onPress={()=>this.props.navigation.dispatch(NavigationActions.back())}>
            <Icon name="ios-arrow-back" size={32} color="#900"/>
          </TouchableOpacity>
          { !isSeller && <View style={{flex:0.2, alignItems:'center', justifyContent:'center', backgroundColor:'#665234'}}>
            <Image source={{uri: item.sellerPic}}
                   style={{borderRadius:20, height:40, width:40,alignItems:'center'}} resizeMode={'cover'}/>
          </View> }
          { !isSeller && <View style={{flex:0.6}}>
            <RectangleButton
              onPress={()=>this.props.navigation.navigate('ItemChat', {item: combItem, itemKey: itemKey})}
              text="CONTACT SELLER"
              type="primary"
              height={75}
              backgroundColors={['#665234', '#514128']}
              gradientStart={{ x: 0.5, y: 1 }}
              gradientEnd={{ x: 1, y: 1 }}>
            </RectangleButton>
          </View>}
          { isSeller && <View style={{flex:0.4}}>
            <RectangleButton
              onPress={()=>this.props.navigation.navigate('SellItemScreen',{itemKey})}
              text="EDIT"
              type="primary"
              height={75}
              backgroundColors={['#665234', '#514128']}
              gradientStart={{ x: 0.5, y: 1 }}
              gradientEnd={{ x: 1, y: 1 }}>
            </RectangleButton>
          </View>
         }
          { isSeller && <View style={{flex:0.4}}>

            <RectangleButton
              onPress={()=>{
                              Alert.alert(
                'Are you sure you want to Delete?',
                'Deleted items cannot be retrieved',
                [
                  {text: 'Yes I am Sure', onPress: () => this.props.attemptDeleteItem(itemKey, navigation)},
                  {text: 'Cancel', style: 'cancel'},
                ],
                { cancelable: false }
              );
              }}
              text="DELETE"
              type="primary"
              height={75}
              backgroundColors={['#BF9C65', '#CEA76A']}
              gradientStart={{ x: 0.5, y: 1 }}
              gradientEnd={{ x: 1, y: 1 }}
            >
            </RectangleButton>
          </View> }
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
    attemptDeleteItem: (data, nav) =>
    {
      return dispatch(ItemDeleteActions.itemDeleteRequest(data, nav))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail)
