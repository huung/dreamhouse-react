import {
    EXPANSE_STATUS,
    TITLE_STATUS
} from '../actions/layout'

const initialState = {
    isSidebar: false,
    activedTitle: 'Welcome to DreamHouse Realty'
  }

  export default (state = initialState, action) => {
    switch(action.type) {
        case EXPANSE_STATUS:
            return Object.assign({}, state, { isSidebar: action.payload })
        case TITLE_STATUS:
            return Object.assign({}, state, { activedTitle: action.payload })
        default:
            return state
    }
  }