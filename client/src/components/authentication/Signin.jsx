import React, {Component} from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import {signin} from '../../actions/auth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
            <Grid className="app-container" fluid>
                <Row>
                    <Col sm={6} smOffset={3}>
                        <Form fields={fields} triggerSubmitFunction={this.props.signin}/>
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
