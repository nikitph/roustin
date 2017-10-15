
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
    let { item, itemKey } = navigation.state.params;
    if(!item.buyerId)
      item = Object.assign(item,
        { buyerId : usr.currentUser.uid, buyerName : usr.currentUser.displayName, buyerPic : usr.currentUser.photoURL});

    let initState = Object.assign( {}, item , messages, { itemKey : itemKey });
    this.state = initState;
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    const { itemKey } = this.props.navigation.state.params;

    this.setState({
      messages: this.props.messages.filter(msg => (msg.buyerId == usr.currentUser.uid ||
      msg.sellerId == usr.currentUser.uid) && msg.itemKey == itemKey).sort(function compare(a, b) {
        let dateA = new Date(a.createdAt);
        let dateB = new Date(b.createdAt);
        return dateB - dateA;
      })
    });
  }

  onSend(messages = []) {

    let msgObj = (messages[0]);
    this.props.postMessage(Object.assign({}, this.state, msgObj));
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
            user={{ _id: usr.currentUser.uid, name:usr.currentUser.displayName, avatar: usr.currentUser.photoURL }}
          />

    )
  }

}

ItemChat.propTypes = {

  postMessage: PropTypes.func

};

const mapStateToProps = (state) => {
  let msgArray = state.itemchat.payload ? Object.values(state.itemchat.payload) : [];
  return {
    messages: msgArray
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    postMessage: (data) =>
      dispatch(ItemChatPostTypes.itemChatPostRequest(data))

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemChat)
