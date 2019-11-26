import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    token: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    chickens: [],
    username: null,

}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false,
        isAuthenticated: true,
        username: action.username
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.err,
        loading: false,
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        isAuthenticated: false
    });
}
const fetchChicken = (state, action) => {
    return updateObject(state, {
        chickens: action.payload
    });
}

const changeRate = (state, action) => {
    console.log(state, action)
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        case actionTypes.FETCH_SUCCESS: return fetchChicken(state,action);
        case actionTypes.RATING_SUCCESS : return changeRate(state,action);
        default:
            return state;
    }
}

export default reducer;