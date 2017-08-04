import React from 'react';
import { Route } from 'react-router-dom';
import { AddPoll, PollsList, Poll } from './';
import { Grid, Row, Col } from 'react-bootstrap';

const Polls = ({ match }) => (
    <Grid className="app-container" fluid>
        <h1 className="title">Sondages</h1>
        <Row>
            <Col sm={6}>
                <PollsList />
                <AddPoll />
            </Col>
            <Col sm={6}>
                <Route path={`${match.url}/:pollId`} component={Poll} />
            </Col>
        </Row>
    </Grid>
);

export default Polls;