import { propertyService } from '../../helper/property_service'

export const PROPERTY_ALL_REQUEST = 'PROPERTY_ALL_REQUEST'
export const PROPERTY_ALL_SUCCESS = 'PROPERTY_ALL_SUCCESS'
export const PROPERTY_ALL_FAILED = 'PROPERTY_ALL_FAILED'
export const PROPERTY_BY_ID_REQUEST = 'PROPERTY_BY_ID_REQUEST'
export const PROPERTY_BY_ID_SUCCESS = 'PROPERTY_BY_ID_SUCCESS'
export const PROPERTY_BY_ID_FAILED = 'PROPERTY_BY_ID_FAILED'
export const PROPERTY_UPDATE = 'PROPERTY_UPDATE'

export const propertyAllRequest = () => {
    return { 
        type: PROPERTY_ALL_REQUEST
    }
}

export const propertyAllSuccess = (properties) => {
    return {
        type: PROPERTY_ALL_SUCCESS,
        payload: properties
    }
}

export const propertyAllFailed = () => {
    return {
        type: PROPERTY_ALL_FAILED,
    }
}

export const propertyByIdRequest = () => {
    return { 
        type: PROPERTY_BY_ID_REQUEST
    }
}

export const propertyByIdSuccess = (property) => {
    return {
        type: PROPERTY_BY_ID_SUCCESS,
        payload: property
    }
}

export const propertyByIdFailed = () => {
    return {
        type: PROPERTY_BY_ID_FAILED,
    }
}

export const findPropertyAll = () => {
    return (dispatch) => {
        dispatch(propertyAllRequest());
        propertyService.propertyAll().then(data => {
            dispatch(propertyAllSuccess(data))
        }, err => {
            dispatch(propertyAllFailed())
        })
    }
}

export const findPropertyById = (id) => {
    return (dispatch) => {
        dispatch(propertyByIdRequest());
        propertyService.propertyById(id).then(data => {
            dispatch(propertyByIdSuccess(data))
        }, err => {
            dispatch(propertyByIdFailed())
        })
    }
}

export const updateProperty = (data) => {
    return {
        type: PROPERTY_UPDATE,
        payload: data
    }
}

