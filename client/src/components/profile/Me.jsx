import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { connect } from 'react-redux';

class Me extends Component {
    render() {
        return (
            <div>
                <h4 className="title">{this.props.user.username}</h4>
                <Image responsive rounded src={`http://www.clashapi.xyz/images/cards/${this.props.user.avatar}.png`} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ user: state.auth.user });

Me = connect(mapStateToProps)(Me);

export default Me;