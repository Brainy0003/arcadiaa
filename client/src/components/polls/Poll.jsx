import React, { Component } from 'react';

class Poll extends Component {
    render() {
        return (
            <div>
                {this.props.match.params.pollId}
            </div>
        );
    }
}

export default Poll;