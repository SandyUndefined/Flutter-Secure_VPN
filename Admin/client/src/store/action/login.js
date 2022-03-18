import axios from 'axios';
import * as actionTypes from './actionTypes';
import { LOGIN, ME, USERS, REGISTER } from './urls';

const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

const loginFail = (err) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        payload: err
    };
};

const loginSuccess = (user) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: user
    };
};

export const login = (email, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await axios.post(
            LOGIN,
            {
                email,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.status === 200) {
            localStorage.setItem('token', response.data.data.token);
            dispatch(loginSuccess(response.data.data));
        } else {
            console.log(response);
        }
    } catch (err) {
        if (err.request.status === 400) {
            const decodedError = JSON.parse(err.request.response);
            dispatch(loginFail(decodedError.error));
        } else {
            dispatch(loginFail('Unable to login at this moment'));
        }
    }
};

export const autoLogin = (token) => async (dispatch) => {
    if (token == null) return;
    try {
        dispatch(loginStart());
        const response = await axios.get(ME, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            console.log(response);
            // localStorage.setItem("token", response.data.data.token);
            dispatch(loginSuccess({ user: response.data, token: token }));
        } else {
            dispatch(loginFail('Login Error'));
            console.log(response);
        }
    } catch (err) {
        dispatch(loginFail('Login Error'));
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.LOGOUT
    };
};

const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    };
};

const fetchUserSuccess = (users) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        payload: users
    };
};

const fetchUserFail = (err) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        payload: err
    };
};

export const fetchUser = (token) => async (dispatch) => {
    try {
        dispatch(fetchUserStart());
        const response = await axios.get(USERS, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        dispatch(fetchUserSuccess(response.data.users));
    } catch (err) {
        dispatch(fetchUserFail('Something went wrong'));
    }
};

const addUserStart = () => {
    return {
        type: actionTypes.ADD_USER_START
    };
};

const addUserSuccess = (user) => {
    return {
        type: actionTypes.ADD_USER_SUCCESS,
        payload: user
    };
};

const addUserFail = (err) => {
    return {
        type: actionTypes.ADD_USER_FAIL,
        payload: err
    };
};

export const addUser = (token, user) => async (dispatch) => {
    try {
        dispatch(addUserStart());
        const response = await axios.post(
            REGISTER,
            {
                ...user
            },
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(addUserSuccess(response.data.user));
    } catch (err) {
        dispatch(addUserFail('Something went wrong'));
    }
};

export const clearError = () => {
    return {
        type: actionTypes.CLEAR_USER_ERROR
    };
};
