import React from 'react';
import { AddPoll, PollsList } from './';
import { Grid, Row, Col } from 'react-bootstrap';

const Polls = ({ match }) => (
    <Grid className="app-container" fluid>
        <h1 className="title">Sondages</h1>
        <Row>
            <Col sm={12}>
                <PollsList />
                <AddPoll />
            </Col>
        </Row>
    </Grid>
);

export default Polls;