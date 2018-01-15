import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {auth, chat, polls, clan, messages} from './reducers';

const store = createStore(combineReducers({auth, chat, polls, clan, messages}), applyMiddleware(logger, thunk));

let nextFlashId = 0;

export const flash = (content, alertClassName = 'success') => {
    store.dispatch({
        type: 'ADD_FLASH_MESSAGE',
        id: nextFlashId++,
        content,
        alertClassName
    });
}

export default store;