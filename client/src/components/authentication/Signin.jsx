import React, {Component} from 'react';
import {signin} from '../../actions/auth';
import {Link} from "react-router-dom";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';

import Form from './Form.jsx';

class Signin extends Component {
    render() {
        const fields = [
            {
                text: 'Pseudo',
                type: 'text',
                name: 'username'
            }, {
                text: 'Mot de passe',
                type: 'password',
                name: 'password'
            }
        ];
        return (
            <Grid>
                <Row>
                    <Col xs={6} xsOffset={3}>
                        <h2 className="text-center">
                            Connexion
                        </h2>
                        <Form fields={fields} triggerSubmitFunction={this.props.signin}/>
                        <hr/>
                        <Link to="/signup" className="text-center">
                            <p className="text-center">Pas de compte ?</p>
                        </Link>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({auth: state.auth, errors: state.errors});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    signin
}, dispatch);

Signin = connect(mapStateToProps, mapDispatchToProps)(Signin);

export default Signin;
