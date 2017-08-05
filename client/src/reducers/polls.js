import {
    ADD_POLL,
    LOAD_POLLS,
    VOTE_POLL
} from '../actions/poll';

const polls = (state = [], action) => {
    switch (action.type) {
        case ADD_POLL:
            return [action.poll].concat(state);
        case LOAD_POLLS:
            return action.polls;
        case VOTE_POLL:
            let index;
            for (let i = 0; i < state.length; i++) {
                if (state[i]._id === action.poll._id) {
                    index = i;
                }
            }
            return [
                ...state.slice(0, index),
                action.poll,
                ...state.slice(index + 1)
            ];
        default:
            return state;
    }
}

export default polls;