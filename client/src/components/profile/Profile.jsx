import React from 'react';
import { ChooseAvatar, Me, Account } from './'
import { Grid, Row, Col } from 'react-bootstrap';

import Subheader from 'material-ui/Subheader';

const Profile = () => (
    <Grid className="app-container" fluid>
        <h1 className="title">Profil</h1>
        <Row>
            <Col sm={12}>
                <Subheader>Moi</Subheader>
                <Me />
            </Col>
            <Col sm={12}>
                <Subheader>Modifiez votre avatar</Subheader>
                <ChooseAvatar />
            </Col>
            <Col sm={12}>
                <Subheader>Compte</Subheader>
                <Account />
            </Col>
        </Row>
    </Grid>
);

export default Profile;