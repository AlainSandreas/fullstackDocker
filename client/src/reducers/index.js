import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth'

// Middleware in the combineReducers
export default combineReducers({ alert, auth })