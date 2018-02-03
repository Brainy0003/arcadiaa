import React, {Component} from 'react';
import {switchRoom} from '../../actions/chat';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Nav, NavItem} from 'react-bootstrap';

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 1
        };
    }

    handleTouchRoom = (room) => {
        this.props.switchRoom(room);
        this.setState({
            activeKey: 2
        })
    }

    render() {
        return (
            <div>
                <Nav bsStyle="pills" activeKey={this.state.activeKey}>
                    <NavItem eventKey={1} onSelect={() => this.handleTouchRoom('general')}>
                        Général
                    </NavItem>
                    <NavItem eventKey={2} onSelect={() => this.handleTouchRoom('deck')}>
                        Decks
                    </NavItem>
                    <NavItem eventKey={3} onSelect={() => this.handleTouchRoom('feature')}>
                        Idées
                    </NavItem>
                    <NavItem eventKey={4} onSelect={() => this.handleTouchRoom('chief')}>
                        Chefs
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({isChief: state.auth.user.isChief});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    switchRoom
}, dispatch);

Rooms = connect(mapStateToProps, mapDispatchToProps)(Rooms);

export default Rooms;