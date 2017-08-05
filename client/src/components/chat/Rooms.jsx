import React, { Component } from 'react';
import { switchRoom } from '../../actions/chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

class Rooms extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleTouchRoom = (room) => {
        this.props.switchRoom(room);
        this.setState({ open: false });
    }

    handleToggle = () => {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <div className="rooms-container">
                <FlatButton
                    label="Salles"
                    onTouchTap={this.handleToggle}
                    icon={<i className="material-icons">people</i>}
                />
                <Drawer
                    docked={false}
                    width={"50%"}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <MenuItem
                        leftIcon={<i className="material-icons">mood</i>}
                        onTouchTap={() => this.handleTouchRoom('general')}>
                        Général
                    </MenuItem>
                    <MenuItem
                        leftIcon={<i className="material-icons">gamepad</i>}
                        onTouchTap={() => this.handleTouchRoom('deck')}>
                        Decks
                    </MenuItem>
                    <MenuItem
                        leftIcon={<i className="material-icons">bug_report</i>}
                        onTouchTap={() => this.handleTouchRoom('bug')}>
                        Bugs
                    </MenuItem>
                    <MenuItem
                        leftIcon={<i className="material-icons">lightbulb_outline</i>}
                        onTouchTap={() => this.handleTouchRoom('feature')}>
                        Idées
                    </MenuItem>
                    {this.props.isChief && <MenuItem
                        leftIcon={<i className="material-icons">people_outline</i>}
                        onTouchTap={() => this.handleTouchRoom('chief')}>
                        Chefs
                    </MenuItem>}
                </Drawer>
            </div >
        );
    }
}

const mapStateToProps = (state) => ({ isChief: state.auth.user.isChief });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    switchRoom
}, dispatch);


Rooms = connect(mapStateToProps, mapDispatchToProps)(Rooms);

export default Rooms;