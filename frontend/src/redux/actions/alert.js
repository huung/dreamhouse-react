export const ALERT_SUCCESS = 'ALERT SUCCESS';
export const ALERT_ERROR = 'ALERT ERROR';
export const ALERT_CLEAR = 'ALERT CLEAR';

export const alertSuccess = (message) => {
  return { type: ALERT_SUCCESS, payload: message };
}

export const alertError = (message) => {
  return { type: ALERT_ERROR, payload: message };
}

export const alertClear = () => {
  return { type: ALERT_CLEAR };
}
