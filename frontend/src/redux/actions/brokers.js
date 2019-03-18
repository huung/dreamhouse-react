import { brokerService } from '../../helper/broker_service'

export const BROKER_ALL_REQUEST = 'BROKER_ALL_REQUEST'
export const BROKER_ALL_SUCCESS = 'BROKER_ALL_SUCCESS'
export const BROKER_ALL_FAILED = 'BROKER_ALL_FAILED'
export const BROKER_BY_ID_REQUEST = 'BROKER_BY_ID_REQUEST'
export const BROKER_BY_ID_SUCCESS = 'BROKER_BY_ID_SUCCESS'
export const BROKER_BY_ID_FAILED = 'BROKER_BY_ID_FAILED'

export const brokerAllRequest = () => {
    return { 
        type: BROKER_ALL_REQUEST
    }
}

export const brokerAllSuccess = (brokers) => {
    return {
        type: BROKER_ALL_SUCCESS,
        payload: brokers
    }
}

export const brokerAllFailed = () => {
    return {
        type: BROKER_ALL_FAILED,
    }
}

export const brokerByIdRequest = () => {
    return { 
        type: BROKER_BY_ID_REQUEST
    }
}

export const brokerByIdSuccess = (broker) => {
    return {
        type: BROKER_BY_ID_SUCCESS,
        payload: broker
    }
}

export const brokerByIdFailed = () => {
    return {
        type: BROKER_BY_ID_FAILED,
    }
}

export const findBrokerAll = () => {
    return (dispatch) => {
        dispatch(brokerAllRequest());
        brokerService.brokerAll().then(data => {
            dispatch(brokerAllSuccess(data))
        }, err => {
            dispatch(brokerAllFailed())
        })
    }
}

export const findBrokerById = (id) => {
    return (dispatch) => {
        dispatch(brokerByIdRequest());
        brokerService.brokerById(id).then(data => {
            dispatch(brokerByIdSuccess(data))
        }, err => {
            dispatch(brokerByIdFailed())
        })
    }
}

