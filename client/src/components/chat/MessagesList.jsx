import React, { Component } from 'react';
import { Message, AddMessage } from './';
import { loadMessages } from '../../actions/chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from 'material-ui/List';

const roomDescription = {
    'general': 'Général désigne aussi salle bordélique car ici on parle de tout.',
    'deck': 'Parlez stratégie. Quel deck utilisez-vous ?',
    'chief': 'Ici, ça ne rigole pas. Nous devons prendre des décisions importantes pour la pérennité de notre clan.',
    'bug': 'Vous avez trouvé un bug. Signalez le ici !'
};

class MessagesList extends Component {
    componentDidMount() {
        if (!this.props.currentRoom) {
            this.props.loadMessages();
        }
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView(false);
    }

    render() {
        if (!this.props.messages) {
            return (
                <div>
                    <h5 className="title text-center">Chargement...</h5>
                </div>
            );
        } else {
            let messages = this.props.messages.filter(message => message.room === this.props.currentRoom);
            return (
                <div className="app-container-row">
                    <em>{roomDescription[this.props.currentRoom]}</em>
                    <div className="messages-list">
                        <List>
                            {messages.map(message => <Message key={message._id} author={message.author} content={message.content} date={message.date} />)}
                        </List>
                        <div style={{ float: "left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </div>
                    <AddMessage />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    messages: state.chat.messages,
    users: state.chat.users,
    currentRoom: state.chat.currentRoom
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadMessages,
}, dispatch);

MessagesList = connect(mapStateToProps, mapDispatchToProps)(MessagesList);

export default MessagesList;