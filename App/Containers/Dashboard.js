import React, { Component } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import  Header   from '../Components/Header'
import  ButtonRow   from '../Components/ButtonRow'
import { dbService, mapp } from '../Services/Firebase'
import { SegmentedControls } from 'react-native-radio-buttons'
import { Images, Metrics } from '../Themes'
import * as Animatable from 'react-native-animatable'




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
    console.log(this.props.navigation.state.params);
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
              You are interested in 12 items</Text>
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
                12 items out for sale</Text>
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
                10 conversations </Text>
            </View>

          </View>

        </View>
        <ButtonRow onPressOne={this.onPressOne} onPressTwo={this.onPressTwo} nav={this.props.navigation}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
