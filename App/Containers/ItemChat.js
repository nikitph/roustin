
import React, {PropTypes} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)

// import MessageGetActions from '../Redux/MessageGetRedux'
// import MessagePostActions from '../Redux/MessagePostRedux'

import {Metrics} from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'

// Styles
import styles from './Styles/ItemChatStyle'

// I18n
import { GiftedChat } from 'react-native-gifted-chat';


class ItemChat extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      item_data: props.data,
      seller: props.data,
      seller_name: props.data,
      buyer: props.buyer,
      buyer_name: props.buyer_name,
      messages: [],

    };
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  makeMsg = (message) => {



  };




  render() {

    return (

          <GiftedChat
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
          _id: 1,
        }}
          />

    )
  }

}

ItemChat.propTypes = {

  requestMessageGet: PropTypes.func,
  requestMessagePost: PropTypes.func,
  building: PropTypes.string,
  user: PropTypes.string,
  buyer: PropTypes.string,
  buyer_name: PropTypes.string

};

const mapStateToProps = (state) => {
  return {


  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    // requestMessageGet: (params) => dispatch(MessageGetActions.messageGetRequest(params)),
    // requestMessagePost: (params) => dispatch(MessagePostActions.messagePostRequest(params))

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemChat)
