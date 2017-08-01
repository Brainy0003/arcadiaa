import React, { Component } from 'react';
import { deleteAccount } from '../../actions/profile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                label="Tout compte fait..."
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Supprimez mon compte"
                labelStyle={{ color: 'red' }}
                onTouchTap={() => this.props.deleteAccount(this.props.id)}
            />,
        ];
        return (
            <div>
                <RaisedButton
                    label="Supprimer mon compte"
                    backgroundColor={red500}
                    labelColor={'white'}
                    onTouchTap={this.handleOpen} />
                <Dialog
                    title="Voulez-vous vraiment supprimer votre compte?"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <ul>
                        <li>Cette étape est <strong>irréversible.</strong></li>
                        <li>Vous perdrez votre statut de chef si vous en êtes un.</li>
                        <li>Vous pouvez vous réinscrire à tout moment.</li>
                    </ul>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ id: state.auth.user.id });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteAccount
}, dispatch);

Account = connect(mapStateToProps, mapDispatchToProps)(Account);

export default Account;