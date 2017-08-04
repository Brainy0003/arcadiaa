import React, { Component } from 'react';
import { Message, AddMessage } from './';

import List from 'material-ui/List';

const roomDescription = {
    'general': 'Général désigne aussi salle bordélique car ici on parle de tout.',
    'deck': 'Parlez stratégie. Quel deck utilisez-vous ?',
    'chief': 'Ici, ça ne rigole pas. Nous devons prendre des décisions importantes pour la pérennité de notre clan.',
    'bug': 'Vous avez trouvé un bug. Signalez le ici !'
};

class MessagesList extends Component {
    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView('smooth')
    }

    render() {
        let messages = this.props.messages.filter(message => message.room === this.props.currentRoom);
        return (
            <div className="app-container">
                <em>{roomDescription[this.props.currentRoom]}</em>
                <div className="messages-list">
                    <List>
                        {messages.map(message => {
                            const hasUser = this.props.users[message.author] !== undefined;
                            const author = hasUser ? message.author : 'Utilisateur supprimé';
                            const avatar = hasUser ? `http://www.clashapi.xyz/images/cards/${this.props.users[author].avatar}.png` : 'http://clashroyalearena.com/wp-content/uploads/2016/11/sad-face-clash-royale.png';
                            return <Message key={message._id} author={author} content={message.content} date={message.date} avatar={avatar} />
                        })}
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

export default MessagesList;