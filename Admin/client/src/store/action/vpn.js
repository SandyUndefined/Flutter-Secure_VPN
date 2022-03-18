import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as url from './urls';

const fetchVpnStart = () => {
    return {
        type: actionTypes.FETCH_VPN_START
    };
};
const fetchVpnFail = (err) => {
    return {
        type: actionTypes.FETCH_VPN_FAIL,
        payload: err
    };
};
const fetchVpnSuccess = (vpns) => {
    return {
        type: actionTypes.FETCH_VPN_SUCCESS,
        payload: vpns
    };
};

export const fetchVpn = (token) => async (dispatch) => {
    try {
        dispatch(fetchVpnStart());
        const response = await axios.get(url.Vpns, {
            // headers: `Barrear ${token}`,
        });

        if (response.status === 200) {
            dispatch(fetchVpnSuccess(response.data.vpns));
        } else {
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
};

const fetchCountriesStart = () => {
    return {
        type: actionTypes.FETCH_COUNTRIES_START
    };
};

const fetchCountriesFail = (err) => {
    return {
        type: actionTypes.FETCH_COUNTRIES_FAIL,
        payload: err
    };
};
const fetchCountriesSuccess = (countries) => {
    return {
        type: actionTypes.FETCH_COUNTRIES_SUCCESS,
        payload: countries
    };
};

export const fetchCountries = () => async (dispatch) => {
    console.log('I am here');
    try {
        dispatch(fetchCountriesStart());
        const response = await axios.get(url.COUNTRIES);
        if (response.status === 200) {
            dispatch(fetchCountriesSuccess(response.data));
        } else {
            console.log(response);
            dispatch(fetchCountriesFail('Something went wrong'));
        }
    } catch (err) {
        dispatch(fetchCountriesFail('Something went wrong'));
    }
};

const addVpnStart = () => {
    return {
        type: actionTypes.ADD_VPN_START
    };
};

const addVpnSuccess = (vpn) => {
    return {
        type: actionTypes.ADD_VPN_SUCCESS,
        payload: vpn
    };
};

const addVpnFail = (err) => {
    return {
        type: actionTypes.ADD_VPN_FAIL,
        payload: err
    };
};

export const addVpn = (token, { name, country, username, password, configScriptTCP, price }) => async (dispatch) => {
    console.log();
    try {
        dispatch(addVpnStart());

        const response = await axios.post(
            url.Vpns,
            {
                name,
                country,
                username,
                password,
                configScriptTCP,
                paid: price === 'free' ? false : true
            },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.status === 201) {
            dispatch(addVpnSuccess(response.data.vpn));
        }
    } catch (err) {
        if (err.request) {
            if (err.request.status === 400) {
                const errorObject = JSON.parse(err.request.response);
                dispatch(addVpnFail(errorObject.error));
            } else if (err.request.status === 500) {
                dispatch(addVpnFail('Unable to add vpn'));
            }
        } else {
            console.log(err);
        }
    }
};

const deleteVpnStart = () => {
    return {
        type: actionTypes.DELETE_VPN_START
    };
};

const deleteVpnSuccess = (id) => {
    return {
        type: actionTypes.DELETE_VPN_SUCCESS,
        payload: id
    };
};
const deleteVpnFail = (err) => {
    return {
        type: actionTypes.DELETE_VPN_FAIL,
        payload: err
    };
};

export const deleteVpn = (token, id) => async (dispatch) => {
    try {
        dispatch(deleteVpnStart());
        const response = await axios.delete(`${url.Vpns}/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (response.status === 204) {
            dispatch(deleteVpnSuccess(id));
        }
    } catch (err) {
        dispatch(deleteVpnFail('Unable to delete vpn'));
    }
};

const updateVpnStart = () => {
    return {
        type: actionTypes.UPDATE_VPN_START
    };
};

const updateVpnSuccess = (vpn) => {
    return {
        type: actionTypes.UPDATE_VPN_SUCCESS,
        payload: vpn
    };
};

const updateVpnFail = (err) => {
    return {
        type: actionTypes.UPDATE_VPN_FAIL,
        payload: err
    };
};
export const clearError = () => {
    return {
        type: actionTypes.CLEAR_VPN_MESSAGE
    };
};

export const updateVpn = (token, id, vpn) => async (dispatch) => {
    try {
        console.log(id);
        vpn.paid = vpn.price === 'free' ? false : true;
        dispatch(updateVpnStart());
        const response = await axios.put(`${url.Vpns}/${id}`, vpn, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            dispatch(updateVpnSuccess(response.data.vpn));
        } else {
        }
    } catch (err) {
        // console.log(err);
        if (err.request.status === 400) {
            const errorObject = JSON.parse(err.request.response);
            dispatch(updateVpnFail(errorObject.error));
        } else if (err.request.status === 500) {
            dispatch(updateVpnFail('Unable to add vpn'));
        }
    }
};
