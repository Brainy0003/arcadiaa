import React, {Component} from 'react';
import {signup} from '../../actions/auth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
      <div className="app-container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <Form fields={fields} triggerSubmitFunction={this.props.signup}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signup
}, dispatch);

Signup = connect(null, mapDispatchToProps)(Signup);

export default Signup;