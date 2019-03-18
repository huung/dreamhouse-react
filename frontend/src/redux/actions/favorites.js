import { favoriteService } from '../../helper/favorite_service'
import { alertError, alertSuccess } from './alert'
export const FAVORITE_ALL_REQUEST = 'FAVORITE_ALL_REQUEST';
export const FAVORITE_ALL_SUCCESS = 'FAVORITE_ALL_SUCCESS';
export const FAVORITE_ALL_FAILED = 'FAVORITE_ALL_FAILED'

export const FAVORITE_BY_ID_REQUEST = 'FAVORITE_BY_ID_REQUEST';
export const FAVORITE_BY_ID_SUCCESS = 'FAVORITE_BY_ID_SUCCESS';
export const FAVORITE_BY_ID_FAILED = 'FAVORITE_BY_ID_FAILED';

export const favoritesAllRequest = () => {
    return {
        type: FAVORITE_ALL_REQUEST
    }
}

export const favoritesAllSuccess = (data) => {
    return {
        type: FAVORITE_ALL_SUCCESS,
        payload: data
    }
}

export const favoritesAllFailed = () => {
    return {
        type: FAVORITE_ALL_FAILED
    }
}

export const favoriteByIdRequest = () => {
    return {
        type: FAVORITE_BY_ID_REQUEST
    }
}

export const favoriteByIdSuccess = (data) => {
    return {
        type: FAVORITE_BY_ID_SUCCESS,
        payload: data
    }
}

export const favoriteByIdFailed = () => {
    return {
        type: FAVORITE_BY_ID_FAILED
    }
}

export const findFavoritesAll = (id) => {
    return (dispatch) => {
        dispatch(favoritesAllRequest());
        favoriteService.favoriteAll(id).then(data => {
            dispatch(favoritesAllSuccess(data))
        }, err => {
            dispatch(favoritesAllFailed())
        })
    }
}

export const findFavoriteById = (id) => {
    return (dispatch) => {
        dispatch(favoriteByIdRequest());
        favoriteService.favoriteById(id).then(data => {
            dispatch(favoriteByIdSuccess(data))
        }, err => {
            dispatch(favoriteByIdFailed())
        })
    }
}
export const addFavoriteById = (data) => {
    return (dispatch) => {
        favoriteService.addFavorite(data).then(result => {
            dispatch(alertSuccess('Property added to your favorites.'))
        }, err => {
            dispatch(alertError('Failed to add favorite'))
        })
    }
}