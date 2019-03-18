import {
    PROPERTY_ALL_REQUEST,
    PROPERTY_ALL_SUCCESS,
    PROPERTY_ALL_FAILED,
    PROPERTY_BY_ID_REQUEST,
    PROPERTY_BY_ID_SUCCESS,
    PROPERTY_BY_ID_FAILED,
    PROPERTY_UPDATE
  } from '../actions/properties';
  
  const initialState = {
    isFetchingProperties: false,
    isFetchedProperties: false,
    isFailedProperties: false,
    isFetchingProperty: false,
    isFetchedProperty: false,
    isFailedProperty: false,
    properties: [],
    property: {},
  }

  export default (state = initialState, action) => {
      switch(action.type) {
        case PROPERTY_ALL_REQUEST: 
            return Object.assign({}, state, { isFetchingProperties: true });
        case PROPERTY_ALL_SUCCESS:
            return Object.assign({}, state, { isFetchingProperties: false, isFetchedProperties: true, properties: action.payload });
        case PROPERTY_ALL_FAILED:
            return Object.assign({}, state, { isFetchingProperties: false, isFailedProperties: true});
        case PROPERTY_BY_ID_REQUEST:
            return Object.assign({}, state, { isFetchingProperty: true });
        case PROPERTY_BY_ID_SUCCESS:
            return Object.assign({}, state, { isFetchingProperty: false, property: action.payload });
        case PROPERTY_BY_ID_FAILED:
            return Object.assign({}, state, { isFetchingProperty: false, isFailedProperty: true});
        case PROPERTY_UPDATE:
            return Object.assign({}, state, {property: action.payload});
        default:
            return state;
      }
  }