import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { MessagesList, Rooms } from './';

class Chat extends Component {
    render() {
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
                        <MessagesList />
                    </Col>
                </Row>
            </Grid >
        );
    }
}

export default Chat;