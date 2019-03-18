import { authService } from '../../helper/auth_service'
import { alertError, alertSuccess } from './alert'
import { history } from '../../helper/history'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_EMAIL = 'SIGNUP_EMAIL';

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FILURE';

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'UPDATE_FILURE';

export const loginRequest = () => {
    return {
      type: LOGIN_REQUEST
    }
  }
  
  export const loginSuccess = (user) => {
    return {
      type: LOGIN_SUCCESS,
      payload: user
    }
  }
  
  export const loginFailure = () => {
    return {
      type: LOGIN_FAILURE
    }
  }
  
  export const logoutSuccess = () => {
    return {
      type: LOGOUT_SUCCESS
    }
  }
  
  export const signupRequest = () => {
    return {
      type: SIGNUP_REQUEST
    }
  }
  
  export const signupFailure = () => {
    return {
      type: SIGNUP_FAILURE
    }
  }
  
  export const signupSuccess = () => {
    return {
      type: SIGNUP_SUCCESS
    }
  }

  export const profileRequest = () => {
      return {
          type: PROFILE_REQUEST
      }
  }

  export const profileSuccess = (data) => {
      return {
          type: PROFILE_SUCCESS,
          payload: data
      }
  }

  export const profileFailure = () => {
      return {
          type: PROFILE_FAILURE
      }
  }

  export const updateRequest = () => {
    return {
        type: UPDATE_REQUEST
    }
  }

  export const updateSuccess = (data) => {
      return {
          type: UPDATE_SUCCESS,
          payload: data
      }
  }

  export const updateFailure = () => {
      return {
          type: UPDATE_FAILURE
      }
  }

  export const signUpEmailError = (data) => {
    return {
      type: SIGNUP_EMAIL,
      payload: data
    }
  }

  export const login = (creds) => {
    return (dispatch) => {
      dispatch(loginRequest());
      authService.login(creds)
        .then(
          data => {
            dispatch(loginSuccess(data));
            history.push('/properties');
          },
          error => {
            dispatch(loginFailure());
            dispatch(alertError('Your account is incorrect.'));
          }
        )
    }
  }

  export const signup = (creds) => {
    return (dispatch) => {
      dispatch(signupRequest());
      authService.signup(creds)
        .then(
          user => {
            console.log(user.type)
            if (user.type) {
              dispatch(signupSuccess(user.result));
              history.push('/login')
              dispatch(alertSuccess('Successfuly registered!'));
            } else {
              dispatch(alertError(user.result))
              dispatch(signUpEmailError(true));
            }
          },
          err => {
            dispatch(signupFailure());
            dispatch(alertError('Your informations is incorrect.'));
            dispatch(signUpEmailError(true));
          }
        );
    }
  }

  export const passwordReset = (creds) => {
    return (dispatch) => {
      authService.passwordReset(creds)
        .then(
          response => {
            history.push('/');
          },
          error => {
          }
        );
    }
  }

  export const passwordResetSubmit = (creds) => {
    return (dispatch) => {
      authService.passwordResetSubmit(creds)
        .then(
          response => {
            history.push('/login');
          },
          error => {
          }
        );
    }
  }

  export const logout = () => {
    return (dispatch) => {
      authService.logout();
      history.push('/');
      dispatch(logoutSuccess());
      document.location.reload(true);
    }
  }

  export const getProfile = (id) => {
    return (dispatch) => {
        dispatch(profileRequest())
        authService.getProfile(id).then(data => {
            dispatch(profileSuccess(data))
        }, err => {
            dispatch(profileFailure())
        })
    }
  }

  export const updateProfile = (data) => {
      return (dispatch) => {
          dispatch(updateRequest())
          authService.updateProfile(data).then(result => {
              dispatch(updateSuccess(data))
              dispatch(alertSuccess('Successfuly update!'))
          }, err => {
              dispatch(updateFailure())
              dispatch(alertError('Error while update profile!'))
          })
      }
  }