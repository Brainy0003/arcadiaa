import {
    LOAD_CLAN_DATA
} from '../actions/clan';

const clan = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CLAN_DATA:
            return {
                ...action.clan
            };
        default:
            return state;
    }
}

export default clan;