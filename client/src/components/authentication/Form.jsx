import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TextFieldGroup from "./TextFieldGroup";

import { clear } from "../../actions/errors";

import { Button } from "react-bootstrap";

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign(
      ...this.props.fields.map(field => ({
        [field.name]: ""
      }))
    );

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmitClick = this.handleSubmitClick.bind(this);

    this.errorFor = this.errorFor.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentWillUnmount() {
    this.props.clear();
  }

  handleSubmitClick() {
    this.props.clear();
    this.props.triggerSubmitFunction(this.state);
  }

  errorFor(field) {
    if (this.props.errors.hasOwnProperty(field)) {
      return this.props.errors[field].msg;
    }
  }

  render() {
    return (
      <form>
        <div className="row">
          {this.props.fields.map((field, i) => (
            <TextFieldGroup
              key={i}
              label={field.text}
              type={field.type}
              name={field.name}
              handleChange={this.handleChange}
              error={this.errorFor(field.name)}
            />
          ))}
          <Button
            type="button"
            bsStyle="primary"
            block
            onClick={this.handleSubmitClick}
          >
            Envoyer
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({ errors: state.errors });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clear
    },
    dispatch
  );

AuthForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthForm));

export default AuthForm;
