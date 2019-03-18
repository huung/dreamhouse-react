import {
    ALERT_SUCCESS,
    ALERT_ERROR,
    ALERT_CLEAR
  } from '../actions/alert';
  
  export default (state = { type: null, message: null }, action) => {
    switch (action.type) {
      case ALERT_SUCCESS:
        return Object.assign(
          {}, state, { type: 'alert-success', message: action.payload }
        )
  
      case ALERT_ERROR:
        return Object.assign(
          {}, state, { type: 'alert-danger', message: action.payload }
        )
  
      case ALERT_CLEAR:
        return {};
  
      default:
        return state
    }
  }
  