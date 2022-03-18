import * as actionTypes from '../action/actionTypes';
import updateObject from './utility';

const init = {
    loading: false,
    vpns: [],
    success: null,
    error: null,
    countries: [],
    countriesLoading: false,
    countriesError: null,
    vpnLoading: false,
    vpnError: null,
    deleteVpnLoading: false
};

// vpns = [
//   {
//     id: "",
//     name: "",
//     country: "",
//     flagLogo: "",
//     username: "",
//     password: "",
//     configScriptTCP: "",
//     configScriptUDP: "",
//     paid: "",
//   },
// ];
// fetch
const fetchVpnStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const fetchVpnSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        vpns: action.payload
    });
};

const fetchVpnFail = (state, action) => {
    return updateObject(state, {
        error: action.payload,
        loading: false
    });
};

// add
const addVpnStart = (state, action) => {
    return updateObject(state, {
        vpnLoading: true
    });
};

const addVpnSuccess = (state, action) => {
    let newVpns = [...state.vpns];
    newVpns.push(action.payload);
    return updateObject(state, {
        vpns: newVpns,
        vpnLoading: false,
        success: 'Successfully added vpn'
    });
};

const addVpnFail = (state, action) => {
    return updateObject(state, {
        error: action.payload,
        vpnLoading: false
    });
};

// update

const updateVpnStart = (state, action) => {
    return updateObject(state, {
        vpnLoading: true
    });
};

const updateVpnSuccess = (state, action) => {
    const newVpn = [...state.vpns];
    const currentVpn = newVpn.filter((x) => x.id === action.payload.id)[0];
    delete newVpn[currentVpn];
    newVpn.push(action.payload);
    return updateObject(state, {
        vpnLoading: false,
        vpns: newVpn
    });
};

const updateVpnFail = (state, action) => {
    return updateObject(state, {
        vpnLoading: false,
        vpnError: action.payload
    });
};

// delete
const deleteVpnStart = (state, action) => {
    return updateObject(state, {
        deleteVpnLoading: true
    });
};

const deleteVpnSuccess = (state, action) => {
    let newVpns = [...state.vpns];
    newVpns = newVpns.filter((v) => v.id !== action.payload);
    return updateObject(state, {
        deleteVpnLoading: false,
        vpns: newVpns,
        success: 'Successfully deleted vpn'
    });
};

const deleteVpnFail = (state, action) => {
    return updateObject(state, {
        deleteVpnLoading: false,
        error: action.payload
    });
};

const fetchCountriesStart = (state, action) => {
    return updateObject(state, {
        countryLoading: true
    });
};

const fetchCountriesSuccess = (state, action) => {
    return updateObject(state, {
        countryLoading: false,
        countries: action.payload
    });
};
const fetchCountriesFail = (state, action) => {
    return updateObject(state, {
        countryLoading: false,
        error: action.payload
    });
};
const clearMessage = (state, action) => {
    return updateObject(state, {
        error: null,
        success: null,
        countriesError: null
    });
};

const reducer = (state = init, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VPN_START:
            return fetchVpnStart(state, action);
        case actionTypes.FETCH_VPN_SUCCESS:
            return fetchVpnSuccess(state, action);
        case actionTypes.FETCH_VPN_FAIL:
            return fetchVpnFail(state, action);
        case actionTypes.ADD_VPN_START:
            return addVpnStart(state, action);
        case actionTypes.ADD_VPN_SUCCESS:
            return addVpnSuccess(state, action);
        case actionTypes.ADD_VPN_FAIL:
            return addVpnFail(state, action);
        case actionTypes.UPDATE_VPN_START:
            return updateVpnStart(state, action);
        case actionTypes.UPDATE_VPN_SUCCESS:
            return updateVpnSuccess(state, action);
        case actionTypes.UPDATE_VPN_FAIL:
            return updateVpnFail(state, action);
        case actionTypes.DELETE_VPN_SUCCESS:
            return deleteVpnSuccess(state, action);
        case actionTypes.DELETE_VPN_START:
            return deleteVpnStart(state, action);
        case actionTypes.DELETE_VPN_FAIL:
            return deleteVpnFail(state, action);
        case actionTypes.FETCH_COUNTRIES_START:
            return fetchCountriesStart(state, action);
        case actionTypes.FETCH_COUNTRIES_FAIL:
            return fetchCountriesFail(state, action);
        case actionTypes.FETCH_COUNTRIES_SUCCESS:
            return fetchCountriesSuccess(state, action);
        case actionTypes.CLEAR_VPN_MESSAGE:
            return clearMessage(state, action);

        default:
            return state;
    }
};

export default reducer;
