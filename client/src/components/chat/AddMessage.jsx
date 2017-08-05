import React, { Component } from 'react';
import { addMessage } from '../../actions/chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class AddMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    handleMessageChange = (e) => {
        this.setState({ message: e.target.value })
    }

    handleKeyPress = (e) => {
        const key = e.nativeEvent.keyCode;
        if (key === 13) {
            this.handleSubmitClick();
        }
    }

    handleSubmitClick = () => {
        let message = this.state.message.trim();
        const room = this.props.currentRoom ? this.props.currentRoom : 'general';
        if (message.length !== 0 && message.length < 500) {
            this.props.addMessage({
                content: message,
                author: this.props.user.username,
                room,
                date: Date.now()
            });
            this.setState({ message: '' });
        }
    }

    render() {
        return (
            <div className="add-message-container">
                <div className="add-message-input-container">
                    <TextField
                        hintText="Tapez votre message ici"
                        fullWidth
                        value={this.state.message}
                        onChange={this.handleMessageChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </div>
                <div className="add-message-button-container" >
                    <FloatingActionButton mini onClick={this.handleSubmitClick}>
                        <i className="material-icons">send</i>
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ user: state.auth.user, currentRoom: state.chat.currentRoom });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addMessage
}, dispatch);

AddMessage = connect(mapStateToProps, mapDispatchToProps)(AddMessage);

export default AddMessage;