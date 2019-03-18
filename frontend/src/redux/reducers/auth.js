import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    UPDATE_SUCCESS,
    SIGNUP_EMAIL
  } from '../actions/auth';
  const USER = JSON.parse(localStorage.getItem('user'))
  const initialState = {
    loggingIn: false,
    loggedIn: false,
    emailError: false,
    user: {
      id: USER ?  USER.id : '',
      email: USER ? USER.email : '',
      token: USER ? USER.token : undefined
    },
    signingUp: false,
    signedUp: false
  }

  export default (state = initialState, action) => {
    switch (action.type) {
  
    case LOGIN_REQUEST:
      return Object.assign({}, state, { loggingIn: true })
  
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { loggingIn: false, loggedIn: true, user: {id: action.payload.id, email: action.payload.email, token: action.payload.token}})
  
    case LOGIN_FAILURE:
      return Object.assign({}, state, { loggingIn: false, loggedIn: false})

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, { loggingIn: false, loggedIn: false, user: {id: '', email: '', token: undefined} })
  
    case SIGNUP_REQUEST:
      return Object.assign({}, state, { signingUp: true })
  
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, { signingUp: false, signedUp: true })
  
    case SIGNUP_FAILURE:
      return Object.assign({}, state, { signingUp: false, signedUp: false })
      
    case SIGNUP_EMAIL:
      return Object.assign({}, state, {emailError: action.payload});

    case UPDATE_SUCCESS:
      return Object.assign({}, state, { loggingIn: false, loggedIn: true, user: Object.assign({}, state.user, action.payload)})
    default:
      return state;
    }
  }