
import React, {PropTypes} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)

import  ItemChatPostTypes  from '../Redux/ItemChatPostRedux'

import {Metrics} from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'

// Styles
import styles from './Styles/ItemChatStyle'
import { dbService, mapp } from '../Services/Firebase'

// I18n
import { GiftedChat } from 'react-native-gifted-chat';
const usr = mapp.auth();


class ItemChat extends React.Component {
  constructor(props: Object) {
    super(props);
    const { navigation, messages } = props;
    const { item, itemKey } = navigation.state.params;
    let initState = Object.assign( {}, item , messages, { itemKey : itemKey },
      { buyerId: usr.currentUser.uid, buyerName: usr.currentUser.displayName, buyerPic: usr.currentUser.photoURL });
    this.state = initState;
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

    let msgObj = (messages[0]);
    this.props.postMessage(Object.assign(this.state, msgObj));
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {

    return (

          <GiftedChat
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{_id: this.state.buyerId}}
          />

    )
  }

}

ItemChat.propTypes = {

  postMessage: PropTypes.func

};

const mapStateToProps = (state) => {
  return {

    messages: state.itemchat || [
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
    ]
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    postMessage: (data) =>
      dispatch(ItemChatPostTypes.itemChatPostRequest(data))

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemChat)
