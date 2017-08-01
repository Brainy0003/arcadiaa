import axios from 'axios';
import io from 'socket.io-client';
import store from '../configureStore';

export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const LOAD_USERS = 'LOAD_USERS';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SWITCH_ROOM = 'SWITCH_ROOM';

const socket = io.connect();

socket.on('add message', (message) => {
    store.dispatch({
        type: ADD_MESSAGE,
        message
    });
});

socket.on('switch room', (room) => {
    store.dispatch({
        type: SWITCH_ROOM,
        room
    });
});

const loadMessagesSuccess = (messages) => ({
    type: LOAD_MESSAGES,
    messages
});

export const loadMessages = () => (dispatch) => {
    return axios.get('/api/chat/messages')
        .then(response => {
            const messages = response.data;
            dispatch(loadMessagesSuccess(messages))
        })
}

export const addMessage = (message) => (dispatch) => {
    return axios.post('/api/chat/addMessage', message)
        .then(response => {
            const messageReceived = response.data;
            socket.emit('add message', messageReceived);
        });
}

export const switchRoom = (room) => (dispatch) => {
    return socket.emit('switch room', room);
}