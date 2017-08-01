import axios from 'axios';

export const ADD_POLL = 'ADD_POLL';

export const addPoll = (poll) => (dispatch) => {
    return axios.post('/api/poll/add', poll).then(response => {
        console.log(response.data);
    });
}