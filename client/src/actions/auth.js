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

const signupSuccess = (data) => {
    localStorage.setItem('jwt', data.token);
    axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`;
    return {
        type: SIGNUP_SUCCESS,
        user: data.user
    }
}

const signupFailure = (error, field) => ({
    type: SIGNUP_FAILURE,
    error,
    field
});

export const signup = (username, password, passwordVerification) => {
    return function (dispatch) {
        return axios.post('/api/auth/signup', {
                username,
                password,
                passwordVerification
            })
            .then(response => {
                const data = response.data;
                data.error ?
                    dispatch(signupFailure(data.error, data.field)) :
                    dispatch(signupSuccess(data));
            }).catch(error => dispatch(signupFailure(error)));
    }
}

/* signin */

const signinSuccess = (data) => {
    localStorage.setItem('jwt', data.token);
    axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`;
    return {
        type: SIGNIN_SUCCESS,
        user: data.user
    }
}

const signinFailure = (error, field) => ({
    type: SIGNIN_FAILURE,
    error,
    field
});

export const signin = (username, password) => {
    return function (dispatch) {
        return axios.post('/api/auth/signin', {
                username,
                password
            })
            .then(response => {
                const data = response.data;
                data.error ?
                    dispatch(signinFailure(data.error, data.field)) :
                    dispatch(signinSuccess(data));
            }).catch(error => dispatch(signinFailure(error)));
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