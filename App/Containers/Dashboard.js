import React, { Component } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import  Header   from '../Components/Header'
import  ButtonRow   from '../Components/ButtonRow'
import { dbService, mapp } from '../Services/Firebase'


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
        <ScrollView style={styles.container}>
          <Image source={{uri: usr.currentUser.photoURL}} style={{flex:0.4,height:200, alignItems:'center'}} resizeMode={'cover'}/>
        </ScrollView>
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
