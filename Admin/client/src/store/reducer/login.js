import updateObject from './utility';
import * as actionTypes from '../action/actionTypes';

// const init = {
//   loading: false,
//   error: null,
//   success: null,
//   token:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1OTFiNzM4LWMxNWEtNGQyOC04YzEyLTcyOGY4NDEyODA3NSIsImlhdCI6MTYxNTYzMjI1OX0.3QgaWEIborQbeXs6_yFBBJvE4zkSon2ROWkfbToNqlI",
//   user: {
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1OTFiNzM4LWMxNWEtNGQyOC04YzEyLTcyOGY4NDEyODA3NSIsImlhdCI6MTYxNTYzMjI1OX0.3QgaWEIborQbeXs6_yFBBJvE4zkSon2ROWkfbToNqlI",
//     user: {
//       firstname: "Aryan",
//       lastname: "phuyal",
//       email: "phuyalrn2@gmail.com",
//       role: "admin",
//     },
//   },
// };

const init = {
    loading: false,
    error: null,
    success: null,
    token: localStorage.getItem('token'),
    user: {},
    users: []
};

const loginStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        token: action.payload.token,
        user: action.payload.user
    });
};
const loginFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.payload,
        token: null,
        user: {}
    });
};
const logout = (state, action) => {
    return updateObject(state, {
        token: null,
        user: {}
    });
};
const fetchUserStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};
const fetchUserSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        users: action.payload
    });
};
const fetchUserFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.payload
    });
};

const addUserStart = (state, action) => {
    return updateObject(state, {
        addUserLoading: true
    });
};
const addUserSuccess = (state, action) => {
    const newUsers = [...state.users];
    newUsers.push(action.payload);
    return updateObject(state, {
        addUserLoading: false,
        addUserSuccess: 'Successfully Added User',
        users: newUsers
    });
};

const addUserFail = (state, action) => {
    return updateObject(state, {
        addUserLoading: false,
        error: action.payload
    });
};
const clearError = (state, action) => {
    return updateObject(state, {
        error: null,
        success: null
    });
};

const reducer = (state = init, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return loginStart(state, action);
        case actionTypes.LOGIN_FAIL:
            return loginFail(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGOUT:
            return logout(state, action);
        case actionTypes.FETCH_USER_START:
            return fetchUserStart(state, action);

        case actionTypes.FETCH_USER_SUCCESS:
            return fetchUserSuccess(state, action);

        case actionTypes.FETCH_USER_FAIL:
            return fetchUserFail(state, action);
        case actionTypes.ADD_USER_START:
            return addUserStart(state, action);
        case actionTypes.ADD_USER_SUCCESS:
            return addUserSuccess(state, action);
        case actionTypes.ADD_USER_FAIL:
            return addUserFail(state, action);
        case actionTypes.CLEAR_USER_ERROR:
            return clearError(state, action);
        default:
            return state;
    }
};
export default reducer;
