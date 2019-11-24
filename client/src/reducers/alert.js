import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = []

export default function(state = initialState, action) {
    const { payload, type } = action;
    
    switch (type) {
        case SET_ALERT:
            // Payload contain the alert
            return [...state, payload]
        case REMOVE_ALERT:
            // Remove specific alert 
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}