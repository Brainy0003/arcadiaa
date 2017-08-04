import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Row, Col, Grid } from 'react-bootstrap';
import { signup, clearErrors } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordVerification: ''
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordVerificationChange = this.handlePasswordVerificationChange.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handlePasswordVerificationChange(e) {
    this.setState({ passwordVerification: e.target.value });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleSubmitClick() {
    this.props.signup(this.state.username, this.state.password, this.state.passwordVerification);
  }

  render() {
    if (this.props.auth.isAuthenticated) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <Grid className="app-container" fluid>
        <Row>
          <Col sm={6} smOffset={3}>
            <Paper zDepth={2} style={{ padding: '15px' }}>
              <Form>
                <h2>Rejoignez-nous!</h2>
                <TextField
                  hintText="Utilisez de préférence votre pseudo Clash Royale"
                  floatingLabelText="Pseudo"
                  fullWidth
                  type="text"
                  errorText={this.props.auth.field === 'username' ? this.props.auth.error : ''}
                  onChange={this.handleUsernameChange}
                /><br />
                <TextField
                  hintText="Utilisez un mot de passe sécurisé"
                  floatingLabelText="Mot de passe"
                  fullWidth
                  type="password"
                  errorText={this.props.auth.field === 'password' ? this.props.auth.error : ''}
                  onChange={this.handlePasswordChange}
                /><br />
                <TextField
                  hintText="Vos mots de passe doivent être identiques"
                  floatingLabelText="Vérification mot de passe"
                  fullWidth
                  type="password"
                  errorText={this.props.auth.field === 'passwordVerification' ? this.props.auth.error : ''}
                  onChange={this.handlePasswordVerificationChange}
                /><br />
                <RaisedButton label="Inscription" primary={true} fullWidth onClick={this.handleSubmitClick} />
                <div>
                  <hr />
                  <p className="text-center">
                    <Link to="/signin">Vous avez déjà un compte?</Link>
                  </p>
                </div>
              </Form>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => bindActionCreators({
  signup,
  clearErrors
}, dispatch);

Signup = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default Signup;