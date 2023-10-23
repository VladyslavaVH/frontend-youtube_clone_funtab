// const TOGGLE_MODAL_ACTIVE = 'TOGGLE_MODAL_ACTIVE';
const SET_LOGIN_MODAL_ACTIVE = 'SET_LOGIN_MODAL_ACTIVE';
const SET_REG_MODAL_ACTIVE = 'SET_REG_MODAL_ACTIVE';
const SET_REG_ACTIVE = 'SET_REG_ACTIVE';

const SET_MODAL_ACTIVE = 'SET_MODAL_ACTIVE';
const SET_LOG_CLOSE = 'SET_LOG_CLOSE';

let initialState = {
    isLoginModalActive: false,
    isRegModalActive: false,
    isReg: false,
    isModalActive: false,
    isLogClose: false
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_MODAL_ACTIVE:
            return {
                ...state,
                isLoginModalActive: action.isActive
            };
        case SET_REG_ACTIVE:
            return {
                ...state,
                isLoginModalActive: !action.isActive,
                isReg: action.isActive
            };
        case SET_REG_MODAL_ACTIVE:
            let logModalActive;
            if (action.isActive) {
                logModalActive = false;
            } else {
                logModalActive = undefined;
            }

            return {
                ...state,
                isLoginModalActive: logModalActive ? logModalActive : state.isLoginModalActive,
                isRegModalActive: action.isActive
            };
        case SET_MODAL_ACTIVE:
            return {
                ...state,
                isModalActive: action.isActive
            };
        case SET_LOG_CLOSE:
            return {
                ...state,
                isLogClose: action.isActive
            };
        default:
            return state;
    }    
}

// export const toggleModalActive = (isActive) => ({ type: TOGGLE_MODAL_ACTIVE, isActive });
export const setLoginModalActive = (isActive) => ({ type: SET_LOGIN_MODAL_ACTIVE, isActive });

export const toggleLoginModalActive = (isActive) => (dispatch) => {
    dispatch(setLoginModalActive(isActive));
}

export const setRegModalActive = (isActive) => ({ type: SET_REG_MODAL_ACTIVE, isActive });

export const toggleRegModalActive = (isActive) => (dispatch) => {
    dispatch(setRegModalActive(isActive));
}

export const setRegActive = (isActive) => ({ type: SET_REG_ACTIVE, isActive });

export const toggleRegActive = (isActive) => (dispatch) => {
    dispatch(setRegActive(isActive));
}

/* --------------------------------------------------------------------------- */
export const setModalActive = (isActive) => ({ type: SET_MODAL_ACTIVE, isActive });

export const toggleModalActive = (isActive) => (dispatch) => {
    dispatch(setModalActive(isActive));
}

export const setLogClose = (isActive) => ({ type: SET_LOG_CLOSE, isActive });

export const toggleLogClose = (isActive) => (dispatch) => {
    dispatch(setLogClose(isActive));
}

export default modalReducer;