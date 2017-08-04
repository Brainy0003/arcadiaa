import {
    ADD_POLL,
    LOAD_POLLS
} from '../actions/poll';

const polls = (state = [], action) => {
    switch (action.type) {
        case ADD_POLL:
            return [action.poll].concat(state);
        case LOAD_POLLS:
            return action.polls;
        default:
            return state;
    }
}

export default polls;