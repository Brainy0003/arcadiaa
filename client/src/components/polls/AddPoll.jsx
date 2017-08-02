import React, { Component } from 'react';
import { addPoll } from '../../actions/poll';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class AddPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: '',
            answers: ''
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    handleAnswersChange = (e) => {
        this.setState({ answers: e.target.value });
    }

    handleSubmitClick = () => {
        this.props.addPoll({
            title: this.state.title,
            answers: this.state.answers,
            author: this.props.user.username,
            date: new Date()
        });
        this.handleClose();
    }

    render() {
        const actions = [
            <FlatButton
                label="Annuler"
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Valider"
                primary
                onTouchTap={this.handleSubmitClick}
            />,
        ];
        if (this.props.user.isChief) {
            return (
                <div>
                    <RaisedButton
                        label="Ajouter un sondage"
                        primary
                        fullWidth
                        onTouchTap={this.handleOpen} />
                    <Dialog
                        title="Ajouter un sondage"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={true}
                    >
                        <h4 className="title">Titre</h4>
                        <TextField
                            fullWidth
                            hintText="Faut-il récompenser les dons ?"
                            onChange={this.handleTitleChange}
                        />
                        <h4 className="title">Réponses</h4>
                        <TextField
                            fullWidth
                            hintText="Oui, Non"
                            onChange={this.handleAnswersChange}
                        />
                        <p className="small">Les réponses doivent être séparées par des virgules.</p>
                    </Dialog>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

const mapStateToProps = (state) => ({ user: state.auth.user });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addPoll
}, dispatch);

AddPoll = connect(mapStateToProps, mapDispatchToProps)(AddPoll);

export default AddPoll;