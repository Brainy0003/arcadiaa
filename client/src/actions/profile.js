import axios from 'axios';
import {
    SIGNOUT
} from './auth';

export const CHANGE_AVATAR = 'CHANGE_AVATAR';

export const changeAvatar = (avatar, id) => async dispatch => {
    const user = await axios.post('/api/profile/avatar', {
        avatar,
        id
    });
    dispatch({
        type: CHANGE_AVATAR,
        user: user.data
    });
}

export const deleteAccount = (id) => async dispatch => {
    await axios.delete(`/api/profile/delete/${id}`)
    localStorage.removeItem('jwt');
    dispatch({
        type: SIGNOUT
    });
}