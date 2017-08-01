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
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
    }

    handleMessageChange(e) {
        this.setState({ message: e.target.value })
    }

    handleSubmitClick() {
        let message = this.state.message.trim();
        if (message.length !== 0 && message.length < 500) {
            this.props.addMessage({
                content: message,
                author: this.props.user.username,
                room: this.props.currentRoom,
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
                        multiLine
                        fullWidth
                        value={this.state.message}
                        onChange={this.handleMessageChange}
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