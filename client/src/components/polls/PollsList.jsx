import React, { Component } from 'react';
import { Poll } from './';
import { loadPolls } from '../../actions/poll';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from 'material-ui/List';

class PollsList extends Component {
    componentDidMount() {
        this.props.loadPolls();
    }

    render() {
        if (!this.props.polls) {
            return (
                <div className="app-container">
                    <h5 className="title text-center">Chargement...</h5>
                </div>
            );
        } else {
            return (
                <List>
                    {this.props.polls.map(poll => <Poll key={poll._id} title={poll.title} />)}
                </List>
            );
        }
    }
}

const mapStateToProps = (state) => ({ polls: state.polls });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadPolls
}, dispatch);

PollsList = connect(mapStateToProps, mapDispatchToProps)(PollsList);

export default PollsList;