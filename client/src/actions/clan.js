import axios from 'axios';

export const LOAD_CLAN_DATA = 'LOAD_CLAN_DATA';

export const loadClanData = () => dispatch => {
    axios.get('/api/clan')
    .then(response => {
        const members = response.data;
        dispatch({
            type: LOAD_CLAN_DATA,
            clan: members
        });
    })
}