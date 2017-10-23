import React, { Component } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Header from '../Components/Header'
import ButtonRow from '../Components/ButtonRow'
import t from 'tcomb-form-native'
import Former from '../Components/Former'
import PhotoUpload from '../Components/PhotoUpload'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import  SellItemActions  from '../Redux/SellItemRedux'
import  ItemUpdateActions  from '../Redux/ItemUpdateRedux'

// Styles
import styles from './Styles/SellItemScreenStyle'
import { dbService, mapp } from '../Services/Firebase'
import { RectangleButton } from 'react-native-button-component'
import { SegmentedControls } from 'react-native-radio-buttons'
import DropdownAlert from 'react-native-dropdownalert'



const usr = mapp.auth();

let _ = require('lodash');

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.formGroup.normal.marginBottom = 10;
stylesheet.formGroup.error.marginBottom = 10;
stylesheet.controlLabel.normal.color = '#414535';
stylesheet.controlLabel.normal.fontSize = 14;
stylesheet.controlLabel.normal.fontFamily = 'AvenirNext-UltraLight';
stylesheet.controlLabel.normal.marginBottom = 5;
stylesheet.controlLabel.normal.fontWeight = '300';
stylesheet.controlLabel.error.color = '#a94442';
stylesheet.controlLabel.error.fontSize = 14;
stylesheet.controlLabel.error.marginBottom = 5;
stylesheet.controlLabel.error.fontWeight = '500';
stylesheet.helpBlock.normal.color = '#999999';
stylesheet.helpBlock.normal.fontSize = 14;
stylesheet.helpBlock.normal.marginBottom = 2;
stylesheet.helpBlock.error.color = '#999999';
stylesheet.helpBlock.error.fontSize = 14;
stylesheet.helpBlock.error.marginBottom = 2;
stylesheet.errorBlock.fontSize = 14;
stylesheet.errorBlock.marginBottom = 2;
stylesheet.errorBlock.color = '#a94442';
stylesheet.textbox.normal.color = '#000000';
stylesheet.textbox.normal.fontSize = 14;
stylesheet.textbox.normal.height = 36;
stylesheet.textbox.normal.padding = 7;
stylesheet.textbox.normal.borderRadius = 4;
stylesheet.textbox.normal.borderColor = '#618985';
stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.normal.borderBottomWidth = 1;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.error.marginBottom = 5;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.error.borderBottomWidth = 1;
stylesheet.textbox.notEditable.fontSize = 14;
stylesheet.textbox.notEditable.height = 36;
stylesheet.textbox.notEditable.padding = 7;
stylesheet.textbox.notEditable.borderRadius = 4;
stylesheet.textbox.notEditable.borderColor = '#cccccc';
stylesheet.textbox.notEditable.borderWidth = 1;
stylesheet.textbox.notEditable.marginBottom = 5;
stylesheet.textbox.notEditable.color = '#777777';
stylesheet.textbox.notEditable.backgroundColor = '#eeeeee';
stylesheet.checkbox.normal.marginBottom = 4;
stylesheet.checkbox.error.marginBottom = 4;
stylesheet.pickerContainer.normal.marginBottom = 4;
stylesheet.pickerContainer.normal.borderRadius = 4;
stylesheet.pickerContainer.normal.borderColor = '#cccccc';
stylesheet.pickerContainer.normal.borderWidth = 1;
stylesheet.pickerContainer.error.borderColor = '#a94442';
// stylesheet.select.normal.android.paddingLeft=7;
// stylesheet.select.normal.android.color='#000000';
// stylesheet.select.error.android.paddingLeft=7;
// stylesheet.select.error.android.color='#a94442';
stylesheet.pickerTouchable.normal.height = 44;
stylesheet.pickerTouchable.normal.flexDirection = 'row';
stylesheet.pickerTouchable.normal.alignItems = 'center';
stylesheet.pickerTouchable.error.height = 44;
stylesheet.pickerTouchable.error.flexDirection = 'row';
stylesheet.pickerTouchable.error.alignItems = 'center';
stylesheet.pickerTouchable.active.borderBottomWidth = 1;
stylesheet.pickerTouchable.active.borderColor = '#cccccc';
stylesheet.pickerValue.normal.fontSize = 14;
stylesheet.pickerValue.normal.paddingLeft = 7;
stylesheet.pickerValue.error.fontSize = 14;
stylesheet.pickerValue.error.paddingLeft = 7;
stylesheet.datepicker.normal.marginBottom = 4;
stylesheet.datepicker.error.marginBottom = 4;
stylesheet.dateValue.normal.color = '#000000';
stylesheet.dateValue.normal.fontSize = 14;
stylesheet.dateValue.normal.padding = 7;
stylesheet.dateValue.normal.marginBottom = 5;
stylesheet.dateValue.error.color = '#a94442';
stylesheet.dateValue.error.fontSize = 14;
stylesheet.dateValue.error.padding = 7;
stylesheet.dateValue.error.marginBottom = 5;
stylesheet.buttonText.fontSize = 18;
stylesheet.buttonText.color = 'white';
stylesheet.buttonText.alignSelf = 'center';
stylesheet.button.height = 36;
stylesheet.button.backgroundColor = '#48BBEC';
stylesheet.button.borderColor = '#48BBEC';
stylesheet.button.borderWidth = 1;
stylesheet.button.borderRadius = 8;
stylesheet.button.marginBottom = 10;
stylesheet.button.alignSelf = 'stretch';
stylesheet.button.justifyContent = 'center';

let Form = t.form.Form;
let options = {stylesheet: stylesheet}; // optional rendering options (see documentation)


let Item = t.struct({
  itemSummary: t.String,              // a required string
  details: t.String,  // an optional string
  price: t.Number,               // a required number
  sold: t.Boolean,        // a boolean
  negotiable: t.Boolean,        // a boolean
});

class SellItemScreen extends Component {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,

  };

  constructor(props: Object) {
    super(props);
    const { navigation } = props;
    let { itemKey } = navigation.state.params;
    if (itemKey) {
      console.tron.log(props.items[itemKey]);
      this.state = Object.assign({},props.items[itemKey],{itemKey: itemKey});
    }
    else {
      this.state = {
        itemSummary: null,
        details: null,
        price: null,
        sold: false,
        negotiable: true,
        sellerId: usr.currentUser.uid,
        sellerName: usr.currentUser.displayName,
        sellerPic: usr.currentUser.photoURL,
        eventImageOneUrl: props.eventImageOne,
        eventImageTwoUrl: props.eventImageTwo,
        eventImageThreeUrl: props.eventImageThree,
        menu: "Item Input Form"
      }
    }

    this.submitFunc.bind(this);

  }

  onChange = (value, path) => {
    // validate a field on every change
    this.refs.fcon.refs.form.getComponent(path).validate();
    this.setState(this.refs.fcon.refs.form.getValue());
  };

  submitFunc(){
    let val = this.refs.fcon.refs.form.getValue();
    if(val && (this.state.eventImageOneUrl || this.state.eventImageTwoUrl || this.state.eventImageThreeUrl))
    {
      this.state.itemKey ? this.props.attemptUpdateItem(this.state) : this.props.attemptSellItem(this.state);
    }
    else {
      this.dropdown.alertWithType('error','Error', 'Please fill in the missing value(s). Atleast one item image is required');
    }
  }


  render () {
    const { navigation } = this.props;
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <Header {...navigation}/>
        <View style={styles.conContainer}>
          <TouchableOpacity
            style={styles.topacity}>
            <Text style={{color:'#F4EAD3', fontSize:14}}>
              { this.state.itemKey ? "Edit Item" : "Item Input Form"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop:5}}>
          <PhotoUpload
            onPhotoSelect={avatar => {
                             if (avatar) {
                                   this.setState({eventImageOneUrl : avatar});
                                 }   }}>
            <Image source={{uri: this.state.eventImageOneUrl ?  this.state.eventImageOneUrl : 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'}}
                   style={{
                                 padding: 10,
                                 width:100,
                                 height: 100,
                               }} resizeMode={'cover'}/>
          </PhotoUpload>
          <PhotoUpload
            onPhotoSelect={avatar => {
                             if (avatar) {
                                   this.setState({eventImageTwoUrl : avatar});
                                 }   }}>
            <Image source={{uri: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'}}
                   style={{
                                 padding: 10,
                                 width:100,
                                 height: 100,
                               }} resizeMode={'cover'}/>
          </PhotoUpload>
          <PhotoUpload
            onPhotoSelect={avatar => {
                             if (avatar) {
                                   this.setState({eventImageThreeUrl : avatar});
                                   console.log(this.state);
                                 }   }}>
            <Image source={{uri: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'}}
                   style={{
                                 padding: 10,
                                 width:100,
                                 height: 100,
                               }} resizeMode={'cover'}/>
          </PhotoUpload>
        </View>
      <ScrollView style={styles.container}>

          <Former onChange={this.onChange} handlePressSend={this.handlePressSend} structure={Item}
                  ref="fcon" value={this.state} options={options}/>
      </ScrollView>
        <View style={styles.btnCtnr}>
          <View style={{flex:0.5}}>
            <RectangleButton
              onPress={()=>this.submitFunc()}
              text="SAVE"
              type="primary"
              height={75}
              backgroundColors={['#665234', '#514128']}
              gradientStart={{ x: 0.5, y: 1 }}
              gradientEnd={{ x: 1, y: 1 }}>
            </RectangleButton>
          </View>
          {
            this.state.itemKey ? <View style={{flex:0.5}}>

            <RectangleButton
              onPress={()=>this.props.onPressTwo(this.props.nav)}
              text="DELETE"
              type="primary"
              height={75}
              backgroundColors={['#BF9C65', '#CEA76A']}
              gradientStart={{ x: 0.5, y: 1 }}
              gradientEnd={{ x: 1, y: 1 }}
            >
            </RectangleButton>
          </View> :
              <View style={{flex:0.5}}>

                <RectangleButton
                  onPress={()=>navigation.navigate('Dashboard')}
                  text="CANCEL"
                  type="primary"
                  height={75}
                  backgroundColors={['#BF9C65', '#CEA76A']}
                  gradientStart={{ x: 0.5, y: 1 }}
                  gradientEnd={{ x: 1, y: 1 }}
                >
                </RectangleButton>
              </View>

          }
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
    items: state.item.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSellItem: (data) =>
      dispatch(SellItemActions.sellItemRequest(data)),

    attemptUpdateItem: (data) =>
    dispatch(ItemUpdateActions.itemUpdateRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellItemScreen)
