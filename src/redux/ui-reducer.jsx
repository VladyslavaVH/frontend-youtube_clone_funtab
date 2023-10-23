const SET_SHOW_MOBILE_SEARCH_FORM = 'SET_SHOW_MOBILE_SEARCH_FORM';
const SET_SEARCH_TEXT_VALUE = 'SET_SEARCH_TEXT_VALUE';
const SET_TAGS_DISPLAY = 'SET_TAGS_DISPLAY';
const SET_MODAL_ACTIVE = 'SET_MODAL_ACTIVE';
const SET_CHILD_MODAL_ACTIVE = 'SET_CHILD_MODAL_ACTIVE';
const SET_BLUR = 'SET_BLUR';
const SET_MODAL_BLUR = 'SET_MODAL_BLUR';
const SET_MODAL_CHILD = 'SET_MODAL_CHILD';
const SET_ITERATOR = 'SET_ITERATOR';
const SET_CHILD_CLOSE = 'SET_CHILD_CLOSE';

let initialState = {
    toShowMobileSearch: false,
    searchTextValue: null,
    tagsDisplay: true,
    modalActive: false,
    childModalActive: false,
    blur: false,
    modalBlur: false,
    isReg: true,
    iterator: -1,
    back: false,
    childClose: false
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOW_MOBILE_SEARCH_FORM:
            
            return {
                ...state,
                toShowMobileSearch: action.draw,
            };
        case SET_SEARCH_TEXT_VALUE: 
            return {
                ...state,
                searchTextValue: action.textValue,
            };
        case SET_TAGS_DISPLAY:
            return {
                ...state,
                tagsDisplay: action.check
            };
        case SET_MODAL_ACTIVE:
            return {
                ...state,
                modalActive: action.isActive
            };
        case SET_CHILD_MODAL_ACTIVE:
        return {
            ...state,
            childModalActive: action.isActive
        };
        case SET_BLUR:
        return {
            ...state,
            blur: action.isActive
        };
        case SET_MODAL_BLUR:
            //debugger;
            return {
                ...state,
                modalBlur: action.isActive
            };
        case SET_MODAL_CHILD:
            //debugger;
            return {
                ...state,
                isReg: action.isActive
            };
        case SET_ITERATOR:
            //debugger;
            return {
                ...state,
                iterator: action.number,
                back: (action.number == -1) ? true : false,
            }
        case SET_CHILD_CLOSE:
            //debugger;
            return {
                ...state,
                childClose: action.close
            }
        default:
            return state;
    }
}

export const drawMobileSearch = (draw) => ({ type: SET_SHOW_MOBILE_SEARCH_FORM, draw });

export const toggleDrawMobileSearch = (draw) => (dispatch) => {
    dispatch(drawMobileSearch(draw));
}

export const setSearchTextValue = (textValue) => ({ type: SET_SEARCH_TEXT_VALUE, textValue });

export const toggleSearchTextValue = (textValue) => (dispatch) => {
    dispatch(setSearchTextValue(textValue));
}

export const setTagsDisplay = (check) => ({ type: SET_TAGS_DISPLAY, check });

export const toggleTagsDisplay = (check) => (dispatch) => {
    dispatch(setTagsDisplay(check));
}

export const setModalActive = (isActive) => ({ type: SET_MODAL_ACTIVE, isActive });

export const toggleModalActive = (isActive) => (dispatch) => {
    dispatch(setModalActive(isActive));
}

export const setChildModalActive = (isActive) => ({ type: SET_CHILD_MODAL_ACTIVE, isActive });

export const toggleChildModalActive = (isActive) => (dispatch) => {
    dispatch(setChildModalActive(isActive));
}

export const setBlur = (isActive) => ({ type: SET_BLUR, isActive });

export const toggleBlur = (isActive) => (dispatch) => {
    dispatch(setBlur(isActive));
}

export const setModalBlur = (isActive) => ({ type: SET_MODAL_BLUR, isActive });

export const toggleModalBlur = (isActive) => (dispatch) => {
    dispatch(setModalBlur(isActive));
}

export const setModalChild = (isActive) => ({ type: SET_MODAL_CHILD, isActive });

export const toggleModalChild = (isActive) => (dispatch) => {
    dispatch(setModalChild(isActive));
}

export const setIteratorAC = (number) => ({ type: SET_ITERATOR, number });

export const setIterator = (number) => (dispatch) => {
    dispatch(setIteratorAC(number));
}

export const setChildClose = (close) => ({ type: SET_CHILD_CLOSE, close });

export const toggleChildClose = (close) => (dispatch) => {
    dispatch(setChildClose(close));
}

export default uiReducer;