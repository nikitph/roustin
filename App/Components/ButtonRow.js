import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { RectangleButton } from 'react-native-button-component'
import styles from './Styles/ButtonRowStyle'
import { Images, Metrics } from '../Themes'


export default class ButtonRow extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View >
        <View style={styles.btnCtnr}>
        <View style={{flex:0.5}}>
          <RectangleButton
            onPress={()=>this.props.onPressOne(this.props.nav)}
            text="BUY"
            type="primary"
            height={75}
            backgroundColors={['#665234', '#514128']}
            gradientStart={{ x: 0.5, y: 1 }}
            gradientEnd={{ x: 1, y: 1 }}>
          </RectangleButton>
        </View>
        <View style={{flex:0.5}}>

          <RectangleButton
            onPress={()=>this.props.onPressTwo(this.props.nav)}
            text="SELL"
            type="primary"
            height={75}
            backgroundColors={['#BF9C65', '#CEA76A']}
            gradientStart={{ x: 0.5, y: 1 }}
            gradientEnd={{ x: 1, y: 1 }}
          >
          </RectangleButton>
        </View>
        </View>
      </View>
    )
  }
}
