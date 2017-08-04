import React, { Component } from 'react';
import { ChooseAvatar, Me, Account } from './'
import { Grid, Row, Col } from 'react-bootstrap';
import { changeAvatar, deleteAccount } from '../../actions/profile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Subheader from 'material-ui/Subheader';

class Profile extends Component {
    render() {
        return (
            <Grid fluid>
                <h1 className="title">Profil</h1>
                <Row>
                    <Col sm={12}>
                        <Subheader>Moi</Subheader>
                        <Me
                            username={this.props.user.username}
                            avatar={this.props.user.avatar}
                        />
                    </Col>
                    <Col sm={12}>
                        <Subheader>Modifiez votre avatar</Subheader>
                        <ChooseAvatar
                            avatar={this.props.user.avatar}
                            id={this.props.user.id}
                            changeAvatar={(avatar, id) => this.props.changeAvatar(avatar, id)}
                        />
                    </Col>
                    <Col sm={12}>
                        <Subheader>Compte</Subheader>
                        <Account id={this.props.user.id} deleteAccount={(id) => this.props.deleteAccount(id)} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({ user: state.auth.user });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    changeAvatar,
    deleteAccount
}, dispatch);

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;