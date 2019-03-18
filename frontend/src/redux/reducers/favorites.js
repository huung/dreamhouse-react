import {
    FAVORITE_ALL_REQUEST,
    FAVORITE_ALL_SUCCESS,
    FAVORITE_ALL_FAILED,
    FAVORITE_BY_ID_REQUEST,
    FAVORITE_BY_ID_SUCCESS,
    FAVORITE_BY_ID_FAILED 
} from '../actions/favorites.js'
import {
    LOGOUT_SUCCESS
} from '../actions/auth.js'

const initialState = {
    isFetchingFavorites: false,
    isFetchedFavorites: false,
    isFailedFavorites: false,
    isFetchingFavorite: false,
    isFetchedFavorite: false,
    isFailedFavorite: false,
    favorites: [],
    favorite: {},
  }

export default (state = initialState, action) => {
    switch(action.type) {
      case FAVORITE_ALL_REQUEST: 
          return Object.assign({}, state, { isFetchingFavorites: true });
      case FAVORITE_ALL_SUCCESS:
          return Object.assign({}, state, { isFetchingFavorites: false, isFetchedFavorites: true, favorites: action.payload });
      case FAVORITE_ALL_FAILED:
          return Object.assign({}, state, { isFetchingFavorites: false, isFailedFavorites: true});
      case FAVORITE_BY_ID_REQUEST:
          return Object.assign({}, state, { isFetchingFavorite: true });
      case FAVORITE_BY_ID_SUCCESS:
          return Object.assign({}, state, { isFetchingFavorite: false, favorite: action.payload });
      case FAVORITE_BY_ID_FAILED:
          return Object.assign({}, state, { isFetchingFavorite: false, isFailedFavorite: true});
      case LOGOUT_SUCCESS:
          return Object.assign({}, state, {favorites: [], favorite: {}})
      default:
          return state;
    }
}