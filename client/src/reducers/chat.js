import {
    LOAD_MESSAGES,
    LOAD_USERS,
    ADD_MESSAGE,
    SWITCH_ROOM
} from '../actions/chat';

import {
    SIGNOUT
} from '../actions/auth';

const chat = (state = {}, action) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return {
                ...state,
                'messages': action.messages,
                'currentRoom': 'general'
            };
        case LOAD_USERS:
            return {
                ...state,
                'users': action.users
            };
        case ADD_MESSAGE:
            return {
                ...state,
                'messages': state.messages.concat(action.message)
            };
        case SWITCH_ROOM:
            return {
                ...state,
                'currentRoom': action.room
            };
        case SIGNOUT:
            return {
                ...state,
                'currentRoom': ''
            };
        default:
            return state;
    }
}

export default chat;