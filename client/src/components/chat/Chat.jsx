import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {MessagesList, Rooms} from './';
import {loadChatData} from '../../actions/chat';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Loader from '../Loader';

class Chat extends Component {
    async componentDidMount() {
        await this
            .props
            .loadChatData();
    }

    render() {
        const room = this.props.currentRoom
            ? this.props.currentRoom
            : 'general';
        if (!this.props.messages || !this.props.users) {
            return (<Loader/>);
        } else {
            return (
                <Grid fluid>
                    <Row>
                        <Col sm={12}>
                            <Rooms/>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm={12}>
                            <MessagesList
                                messages={this.props.messages}
                                currentRoom={this.props.currentRoom}
                                users={this.props.users}/>
                        </Col>
                    </Row>
                </Grid >
            );
        }
    }
}

const mapStateToProps = (state) => ({messages: state.chat.messages, users: state.chat.users, currentRoom: state.chat.currentRoom});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadChatData
}, dispatch);

Chat = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default Chat;