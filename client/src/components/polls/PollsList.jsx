import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Poll } from './';
import { loadPolls } from '../../actions/poll';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';

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
                    {this.props.polls.map(poll => {
                        return (
                            <Link key={poll._id} to={`/polls/${poll._id}`}>
                                <ListItem>
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

const mapStateToProps = (state) => ({ polls: state.polls });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadPolls
}, dispatch);

PollsList = connect(mapStateToProps, mapDispatchToProps)(PollsList);

export default PollsList;