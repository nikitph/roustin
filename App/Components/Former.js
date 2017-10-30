import React, { PropTypes } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Keyboard, TouchableOpacity } from 'react-native'
import styles from './Styles/FormerStyle'
import t from 'tcomb-form-native'

let Form = t.form.Form;

type FormerProps = {
  onChange: () => void,
  handlePressSend: () => void,
  text?: string,
  value?: Object,
  options?: Object,
  structure?: Object
}

export default class Former extends React.Component {

  props: FormerProps;

  render () {

    onChange = (value, path) => {
      this.props.onChange(this.refs.form.getValue());
    };

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.containertwo}>
            <View style={{flex:0.9, marginLeft:20, marginRight:20}}>
              <Form
                ref="form"
                type={this.props.structure}
                options={this.props.options}
                value={this.props.value}
                onChange={this.props.onChange}
              />
            </View>
          </View>
          {/*<Spinner visible={this.props.isfetching} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>*/}
          {/*<Text>{this.props.isfetching ? 'true' : 'false'}</Text>*/}
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}
