import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';
import { LOGIN_FAIL, LOGIN_SUCCESS } from './types';
import { USER_LOADED, AUTH_ERROR } from './types';
import { LOGOUT } from './types';
import { setAlert } from './alert';
import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth/user')

        dispatch({
            type: USER_LOADED,
            payload: res.data.user
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Load user
export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
}

// Login user
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
   
    const body = JSON.stringify({ email, password })
    
    try {
       const res = await axios.post('/api/auth/login', body, config)
   
       dispatch({
           type: LOGIN_SUCCESS,
           payload: res.data
       })

       dispatch(loadUser());
    } catch(err) {
       const errors = err.response.data.errors; 
   
       if(errors) {
           errors.forEach(error => {
               dispatch(setAlert(err.message, 'danger'))
           })
       }
       dispatch({ 
           type: LOGIN_FAIL
       })
    }
}

// Register user
export const register = ({ firstName, lastName, email, password }) => async dispatch => {
 const config = {
     headers: {
         'Content-Type':'application/json'
     }
 }

 const body = JSON.stringify({ firstName, lastName, email, password })
 
 try {
    const res = await axios.post('/api/users/register', body, config)

    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })

    dispatch(loadUser());
 } catch(err) {
    const errors = err.response.data.errors; 

    if(errors) {
        errors.forEach(error => {
            dispatch(setAlert(err.message, 'danger'))
        })
    }
    dispatch({ 
        type: REGISTER_FAIL
    })
 }
}