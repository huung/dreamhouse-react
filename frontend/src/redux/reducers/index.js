import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import brokers from './brokers'
import favorites from './favorites'
import properties from './properties'
import layout from './layout'

const rootReducer = combineReducers({
    alert,
    auth,
    brokers,
    favorites,
    properties,
    layout
});

export default rootReducer