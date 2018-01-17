import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {clear} from '../../actions/errors';

class AuthForm extends Component {
    constructor(props) {
        super(props);

        /**
         * [{name: 'username', type: 'text', ...}, {name: 'password', ...}] => {username: '', password: '', errors: []}
         */
        this.state = Object.assign(...this.props.fields.map(field => ({
            [field.name]: ''
        })));

        this.handleChange = this
            .handleChange
            .bind(this);

        this.handleSubmitClick = this
            .handleSubmitClick
            .bind(this);

        this.errorFor = this
            .errorFor
            .bind(this);
    }

    handleChange(e, element) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    componentWillUnmount() {
        this
            .props
            .clear();
    }

    handleSubmitClick() {
        this
            .props
            .clear();
        this
            .props
            .triggerSubmitFunction(this.state);
    }

    errorFor(field) {
        if (this.props.errors.hasOwnProperty(field)) {
            return this.props.errors[field].msg;
        }
    }

    render() {
        return (
            <form>
                {this
                    .props
                    .fields
                    .map((field, i) => {
                        return (<TextField
                            key={i}
                            hintText={field.placeholder}
                            floatingLabelText={field.text}
                            fullWidth
                            name={field.name}
                            type={field.type}
                            errorText={this.errorFor(field.name)}
                            onChange={this.handleChange}/>)
                    })}
                <RaisedButton
                    label="Envoyer"
                    primary={true}
                    fullWidth
                    onClick={this.handleSubmitClick}/>
            </form>
        )
    }
}

const mapStateToProps = state => ({errors: state.errors});

const mapDispatchToProps = dispatch => bindActionCreators({
    clear
}, dispatch);

AuthForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthForm));

export default AuthForm;
