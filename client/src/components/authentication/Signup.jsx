import React, { Component } from 'react';
import { FieldGroup } from './';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Alert, Row, Col, Grid } from 'react-bootstrap';
import { signup } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
            <Form>
              <h2>Rejoignez nous !</h2>
              {this.props.auth.hasErrors &&
                <Alert bsStyle="danger">
                  <h4>Oops... Une erreur est survenue <i className="fa fa-frown-o"></i></h4>
                  <p>{this.props.auth.error}</p>
                </Alert>
              }
              <FieldGroup id="username" label="Pseudo" type="text" help="De préférence, votre pseudo Clash Royale" name="username" onChange={this.handleUsernameChange} />
              <FieldGroup id="password" label="Mot de passe" type="password" help="Choisissez un mot de passe sécurisé" name="password" onChange={this.handlePasswordChange} />
              <FieldGroup id="password-verification" label="Confirmez votre mot de passe" help="Vos mots de passe doivent être identiques" type="password" name="passwordVerification" onChange={this.handlePasswordVerificationChange} />
              <Button bsStyle="primary" bsSize="large" block onClick={this.handleSubmitClick}>Inscription</Button>
              <div>
                <hr />
                <p className="text-center">
                  <Link to="/signin">Vous avez déjà un compte?</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => bindActionCreators({
  signup
}, dispatch);

Signup = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default Signup;