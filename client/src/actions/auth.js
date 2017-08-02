import axios from 'axios';
import store from '../configureStore';

export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNOUT = 'SIGNOUT';
export const AUTH_USER = 'AUTH_USER';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

/* authenticate user if one token already exists */

const token = localStorage.getItem('jwt');
if (token) {
    axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
    axios.post('/api/auth/decodeToken', {
        token
    }).then(response => {
        const user = response.data;
        store.dispatch({
            type: AUTH_USER,
            user
        });
    });
}

/* signup */

export const signup = (username, password, passwordVerification) => {
    return async dispatch => {
        const onSuccess = (data) => {
            localStorage.setItem('jwt', data.token);
            axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`;
            return {
                type: SIGNUP_SUCCESS,
                user: data.user
            };
        }
        const onFailure = (error, field) => ({
            type: SIGNUP_FAILURE,
            error,
            field
        });
        try {
            const response = await axios.post('/api/auth/signup', {
                username,
                password,
                passwordVerification
            });
            const data = response.data;
            if (data.error) {
                dispatch(onFailure(data.error, data.field))
            } else {
                dispatch(onSuccess(data))
            }
        } catch (error) {
            return error;
        }
    }
}

/* signin */

export const signin = (username, password) => {
    return async dispatch => {
        const onSuccess = (data) => {
            localStorage.setItem('jwt', data.token);
            axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`;
            return {
                type: SIGNIN_SUCCESS,
                user: data.user
            }
        }
        const onFailure = (error, field) => ({
            type: SIGNIN_FAILURE,
            error,
            field
        })
        try {
            const response = await axios.post('/api/auth/signin', {
                username,
                password
            });
            const data = response.data;
            if (data.error) {
                dispatch(onFailure(data.error, data.field))
            } else {
                dispatch(onSuccess(data))
            }
        } catch (error) {
            return error;
        }
    }
}

/* signout */

export const signout = () => {
    localStorage.removeItem('jwt');
    return {
        type: SIGNOUT
    };
}

/* clear errors */

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});