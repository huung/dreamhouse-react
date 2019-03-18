export const EXPANSE_STATUS = 'EXPANSE_STATE';
export const TITLE_STATUS = 'TITLE_STATE';

export const expanseNavbar = (isOpen) => {
    return {
        type: EXPANSE_STATUS,
        payload: isOpen
    }
}

export const changeTitle = (title) => {
    return {
        type: TITLE_STATUS,
        payload: title
    }
}