import {
    BROKER_ALL_REQUEST,
    BROKER_ALL_SUCCESS,
    BROKER_ALL_FAILED,
    BROKER_BY_ID_REQUEST,
    BROKER_BY_ID_SUCCESS,
    BROKER_BY_ID_FAILED 
  } from '../actions/brokers';
  
  const initialState = {
    isFetchingBrokers: false,
    isFetchedBrokers: false,
    isFailedBrokers: false,
    isFetchingBroker: false,
    isFetchedBroker: false,
    isFailedBroker: false,
    brokers: [],
    broker: {},
  }

  export default (state = initialState, action) => {
      switch(action.type) {
        case BROKER_ALL_REQUEST: 
            return Object.assign({}, state, { isFetchingBrokers: true });
        case BROKER_ALL_SUCCESS:
            return Object.assign({}, state, { isFetchingBrokers: false, isFetchedBrokers: true, brokers: action.payload });
        case BROKER_ALL_FAILED:
            return Object.assign({}, state, { isFetchingBrokers: false, isFailedBrokers: true});
        case BROKER_BY_ID_REQUEST:
            return Object.assign({}, state, { isFetchingBroker: true });
        case BROKER_BY_ID_SUCCESS:
            return Object.assign({}, state, { isFetchingBroker: false, broker: action.payload });
        case BROKER_BY_ID_FAILED:
            return Object.assign({}, state, { isFetchingBroker: false, isFailedBroker: true});
        default:
            return state;
      }
  }