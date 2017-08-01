import axios from 'axios';
import {
    SIGNOUT
} from './auth';

export const CHANGE_AVATAR = 'CHANGE_AVATAR';

export const changeAvatar = (avatar, id) => (dispatch) => {
    return axios.post('/api/profile/avatar', {
        avatar,
        id
    }).then(response => {
        const user = response.data;
        dispatch({
            type: CHANGE_AVATAR,
            user
        });
    });
}

export const deleteAccount = (id) => (dispatch) => {
    return axios.delete(`/api/profile/delete/${id}`).then(response => {
        localStorage.removeItem('jwt');
        dispatch({
            type: SIGNOUT
        });
    });
}