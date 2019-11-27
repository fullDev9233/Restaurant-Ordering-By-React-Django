import * as actionTypes from './actionTypes';
import axios from 'axios';

const deploy = false;
const path = deploy ? '13.123.123.12:8000' : 'ec2-54-180-8-64.ap-northeast-2.compute.amazonaws.com:8000'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START  
    }
}

export const authSuccess = (token,username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error 
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('name');

    return {
        type: actionTypes.AUTH_LOGOUT
    }

}
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}
export const authLogin =  (username, password, callback) => {
    return (dispatch) => {
        dispatch(authStart());
        axios.post('http://'+path+'/rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            console.log(username)
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000 );
            localStorage.setItem('token', token);
            localStorage.setItem('name', username);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(token, username));
            dispatch(checkAuthTimeout(3600));
            callback()
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://'+path+'/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2

        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000 );
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('name',username);

            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.token;
        if( token === undefined){
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.expirationDate);
            if( expirationDate <= new Date() ){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000));

            }
        }
    }
}



export const fetchSuccess = chickens => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        payload: chickens
    }
}

export const fetchFail = () => {
    return {
        type: actionTypes.FETCH_FAIL,
    }
}

export const fetchChicken =  () => {
    return (dispatch) => {
        axios.get('http://'+path+'/api/chickens/')
        .then(res => {
            const chickens = res.data;
            dispatch(fetchSuccess(chickens));
        })
        .catch(err => {
            dispatch(fetchFail())
        })
    }
}

export const ratingSuccess = (username, itemname, rate) => {
    return {
        type: actionTypes.RATING_SUCCESS,
        username: username,
        chickenID: itemname,
        rate : rate
    }
}

export const updateRate =  (username, itemname, rate) => {
    return (dispatch) => {
        axios.post('http://'+path+'/api/ranking/', {
            username: username,
            chickenID: itemname,
            rate : rate
        })
        .then(res => {
            //dispatch(ratingSuccess(username, itemname, rate))
        })
        .catch()
    }
}


