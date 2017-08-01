import React from 'react';
import { AddPoll } from './';
import { Grid, Row, Col } from 'react-bootstrap';

import Subheader from 'material-ui/Subheader';

const Polls = () => (
    <Grid className="app-container" fluid>
        <h1 className="title">Sondages</h1>
        <Row>
            <Col sm={12}>
            </Col>
            <Col sm={12}>
                <AddPoll />
            </Col>
        </Row>
    </Grid>
);

export default Polls;