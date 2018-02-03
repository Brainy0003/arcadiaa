import React, {Component} from 'react';
import {signup} from '../../actions/auth';
import {Link} from "react-router-dom";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Grid, Row, Col} from 'react-bootstrap';

import Form from './Form.jsx';

class Signup extends Component {
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
      }, {
        text: 'Confirmation du mot de passe',
        type: 'password',
        name: 'passwordVerification'
      }
    ];
    return (
      <Grid>
        <Row>
          <Col xs={6} xsOffset={3}>
            <h2 className="text-center">
              Inscription
            </h2>
            <Form fields={fields} triggerSubmitFunction={this.props.signup}/>
            <hr/>
            <Link to="/signin" className="text-center">
              <p className="text-center">Vous avez déjà un compte?</p>
            </Link>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signup
}, dispatch);

Signup = connect(null, mapDispatchToProps)(Signup);

export default Signup;
