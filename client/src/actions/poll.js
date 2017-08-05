import axios from 'axios';

export const LOAD_POLLS = 'LOAD_POLLS';
export const VOTE_POLL = 'VOTE_POLL';
export const ADD_POLL = 'ADD_POLL';

export const loadPolls = () => async dispatch => {
    const response = await axios.get('/api/poll/all');
    dispatch({
        type: LOAD_POLLS,
        polls: response.data
    });
}

export const votePoll = (id, username, pos) => async dispatch => {
    const response = await axios.post(`/api/poll/vote/${id}`, {
        username,
        pos
    });
    dispatch({
        type: VOTE_POLL,
        poll: response.data
    })
}

export const addPoll = (poll) => async dispatch => {
    const response = await axios.post('/api/poll/add', poll);
    dispatch({
        type: ADD_POLL,
        poll: response.data
    });
}