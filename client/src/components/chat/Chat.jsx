import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { MessagesList, Rooms } from './';
import { loadChatData } from '../../actions/chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Chat extends Component {
    async componentDidMount() {
        await this.props.loadChatData();
    }

    render() {
        if (!this.props.messages || !this.props.users) {
            return (
                <div className="app-container">
                    <h5 className="title text-center">Chargement...</h5>
                </div>
            );
        } else {
            return (
                <Grid fluid className="app-container">
                    <Row>
                        <Col sm={12} className="chat-header">
                            <h1 className="title pull-left">Chat</h1>
                            <Rooms className="pull-right" />
                        </Col>
                    </Row>
                    <Row className="app-container-row">
                        <Col sm={12} className="app-container">
                            <MessagesList
                                messages={this.props.messages}
                                currentRoom={this.props.currentRoom}
                                users={this.props.users}
                            />
                        </Col>
                    </Row>
                </Grid >
            );
        }
    }
}

const mapStateToProps = (state) => ({
    messages: state.chat.messages,
    users: state.chat.users,
    currentRoom: state.chat.currentRoom
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadChatData
}, dispatch);

Chat = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default Chat;