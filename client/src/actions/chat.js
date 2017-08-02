import axios from 'axios';
import io from 'socket.io-client';
import store from '../configureStore';

export const LOAD_CHAT_DATA = 'LOAD_CHAT_DATA';
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

export const loadChatData = () => async dispatch => {
    const messages = await axios.get('/api/chat/messages');
    const users = await axios.get('/api/user/all');
    return dispatch({
        type: LOAD_CHAT_DATA,
        messages: messages.data,
        users: users.data
    });
};

export const addMessage = (message) => async dispatch => {
    const messageReceived = await axios.post('/api/chat/addMessage', message);
    return socket.emit('add message', messageReceived.data);
}

export const switchRoom = (room) => (dispatch) => {
    return socket.emit('switch room', room);
}