import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadPolls } from '../../actions/poll';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Loader from '../Loader';

import { List, ListItem } from 'material-ui/List';


class PollsList extends Component {
    componentDidMount() {
        this.props.loadPolls();
    }

    render() {
        if (!this.props.polls) {
            return (
                <Loader/>
            );
        } else {
            return (
                <List>
                    {this.props.polls.map(poll => {
                        const voters = poll.voters.map(voter => voter.username);
                        const hasAlreadyVoted = voters.includes(this.props.username);
                        return (
                            <Link key={poll._id} to={`/polls/${poll._id}`}>
                                <ListItem leftIcon={hasAlreadyVoted ? <i className="material-icons">check_circle</i> : <i className="material-icons">radio_button_unchecked</i>}>
                                    {poll.title}
                                </ListItem>
                            </Link>
                        );
                    })}
                </List>
            );
        }
    }
}

const mapStateToProps = (state) => ({ username: state.auth.user.username, polls: state.polls });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadPolls
}, dispatch);

PollsList = connect(mapStateToProps, mapDispatchToProps)(PollsList);

export default PollsList;