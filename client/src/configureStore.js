import {
    applyMiddleware,
    combineReducers,
    createStore
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {
    auth,
    chat,
    polls,
    clan
} from './reducers';

const store = createStore(combineReducers({
    auth,
    chat,
    polls,
    clan
}), applyMiddleware(logger, thunk));

export default store;