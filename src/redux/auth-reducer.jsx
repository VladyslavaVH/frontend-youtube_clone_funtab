import { authAPI, loginAPI, unAuthAPI } from "../api/api";
import { registerAPI } from './../api/api';

const SET_LOGIN_DATA = 'SET-LOGIN-DATA';

const CHECK_REG_DATA = 'CHECK_REG_DATA';
const CHECK_CODE = 'CHECK_CODE';
const CHECK_VALID_CODE = 'CHECK_VALID_CODE';
const SET_REG_DATA = 'SET_REG_DATA';
const SET_AUTH_DATA = 'SET_AUTH_DATA';
const SIGN_IN = 'SIGN_IN';

const SET_UNAUTH_TAGS = 'SET_UNAUTH_TAGS';
const SET_UNAUTH_VIDEOS = 'SET_UNAUTH_VIDEOS';
const SET_AUTH_TAGS = 'SET_AUTH_TAGS';
const SET_AUTH_VIDEOS = 'SET_AUTH_VIDEOS';

const SET_AUTH_HEADER_DATA = 'SET_AUTH_HEADER_DATA';

let initialState = {
    id: 1,
    email: null,
    firstName: null,
    lastName: null,
    googleId: null,
    imageUrl: null,//for google auth
    icon: null,
    userName: null,
    isAuth: false,
    notifications: [],
    playLists: [],
    myChannels: [],
    searchOptions: [],
    blueChannels: [],
    tags: [],
    videos: [],
    subs: [],
    validRegData: false,
    wrongCode: false,
    validCode: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };
        case CHECK_REG_DATA:
            return {
                ...state,
                validRegData: action.validRegData
            }
        case CHECK_CODE:
            return {
                ...state,
                wrongCode: action.wrongCode
            }
        case CHECK_VALID_CODE:
            return {
                ...state,
                validCode: action.data.validCode,
                id: action.data.id,
                icon: action.data.icon,
                imageUrl: action.data.imageUrl,
                notifications: action.data.notifications ? action.data.notifications : [],
                playLists: action.data.playLists ? action.data.playLists : [],
                subs: action.data.subscriptions,
                tags: action.data.tags, //?
                isAuth: true
            }
        case SET_REG_DATA:
            return {
                ...state,
                //////////////////////
            }
        case SET_UNAUTH_TAGS:
            return {
                ...state,
                tags: action.tags
            }
        case SET_AUTH_DATA:
            let mainChannel = action.channels[0];
            let channels = [];
            for (let i = 1; i < action.channels.length; i++) {
                channels.push(action.channels[i]);                
            }
            return {
                ...state,
                id: mainChannel.id,
                icon: mainChannel.icon,
                imageUrl: mainChannel.imageUrl,
                notifications: mainChannel.notifications ? mainChannel.notifications : [],
                playLists: mainChannel.playLists ? mainChannel.playLists : [],
                subs: mainChannel.subscriptions,
                tags: mainChannel.tags, //?
                myChannels: channels,
                isAuth: true
            }
        case SIGN_IN:
            return {
                ...state,
                ////////////////////
            }
        case SET_UNAUTH_VIDEOS:
            return {
                ...state,
                videos: action.videos
            }
        case SET_AUTH_TAGS:
            return {
                ...state,
                tags: action.tags
            }
        case SET_AUTH_VIDEOS:
            return {
                ...state,
                videos: action.videos
            }
        case SET_AUTH_HEADER_DATA:
            return {
                ...state,
                tags: action.data.tags,
                subs: action.data.subs,
                notifications: action.data.notifications,
                searchOptions: action.data.searchOptions,
                videos: action.data.videos,
                blueChannels: action.data.blueChannels,
                myChannels: action.data.myChannels,
                isAuth: true
            }
        default:
            return state;
    }    
}

export const setAuthUserDataAC = (email, userName, icon, lastName, firstName, googleId, imageUrl ) => ({ type: SET_LOGIN_DATA, 
    data: {email, userName, icon, lastName, firstName, googleId, imageUrl} });
export const setAuthUserData = (email, userName, icon, lastName, firstName, googleId, imageUrl) => (dispatch) => {
    dispatch(setAuthUserDataAC(email, userName, icon, lastName, firstName, googleId, imageUrl));
}

export const checkValidRegData = (validRegData) => ({ type: CHECK_REG_DATA, validRegData });
export const registration = (formData) => (dispatch) => {
    registerAPI.registration(formData).then(response => {
        let check = true;
        if (response.data.code != 200) {
            check = false;
        } 
        console.log(response.data.code);
        dispatch(checkValidRegData(check))
    });
}

export const checkCode = (wrongCode) => ({ type: CHECK_CODE, wrongCode });
export const checkValidCode = (data) => ({ type: CHECK_VALID_CODE, data });
export const verifyCode = (email, code) => (dispatch) => {
    registerAPI.verifyCode(email, code)
    .then(response => {
        let check = false;
        if (response.data.code == 205) {
            check = true;
        } else if (response.data.code == 200) {
            dispatch(checkValidCode({...response.data.channels[0], validCode: true}));
            localStorage.setItem('jwt', response.data.jwt);
        }
        dispatch(checkCode(check));
    });
}

export const getAuthUserData = () => (dispatch) => {
    // authAPI.me().then(response => {
    //     if (response.data.resultCode === 0) {
    //         let {id, login, password} = response.data.data;
    //         dispatch(setAuthUserData(id, login, password));
    //     }
    // });
}

export const setUnAuthTags = (tags) => ({ type: SET_UNAUTH_TAGS, tags });
export const getUnAuthTags = () => (dispatch) => {
    unAuthAPI.getTags().then(response => {
        //debugger;
        if (response.data.code == 200) {
            dispatch(setUnAuthTags(response.data.tags));
        } else {
            console.log('Error:', response.data.code);
        }
    });
}

export const setAuthDataAC = (channels) => ({ type: SET_AUTH_DATA, channels });
export const setAuthData = () => (dispatch) => {
    authAPI.authorization().then(response => {
        if (response.data.code == 200) {
            dispatch(setAuthDataAC(response.data.channels));
        } else {
            console.log('Error:', response.data.code);
        }
    });
}

// export const signIn = (data) => (dispatch) => {
//     authAPI.signIn(data).then(response => {
//         if (response.data.code == 200) {
//             localStorage.setItem('jwt', response.data.jwt);
//             setAuthData();
//         } 
//         console.log(response.data.code);
//         //dispatch(signInAC(check))
//     });
// }

export const resendCode = (repeat, email) => (dispatch) => {
    registerAPI.resendCode(repeat, email).then(response => {
        if (response.data.code == 201) {
            console.log('Resend successfully');
        } else {
            console.log('Code resend error', response.data.code);
        }
    })
}

export const login = (email, password) => (dispatch) => {
    loginAPI.auth(email, password).then(response => {
        debugger;
        if (response.data.code == 200) {
            localStorage.setItem('jwt', response.data.jwt);
            setAuthData();
        } else {
            console.log('Login error', response.data.code);
        }
    })
}

export const setUnAuthVideos = (videos) => ({ type: SET_UNAUTH_VIDEOS, videos });
export const getUnAuthVideos = () => (dispatch) => {
    dispatch(setUnAuthVideos(unAuthAPI.getVideos()));
}

export const setAuthTags = (tags) => ({ type: SET_AUTH_TAGS, tags });
export const getAuthTags = () => (dispatch) => {
    dispatch(setAuthTags(authAPI.getTags()));
}

export const setAuthVideos = (videos) => ({ type: SET_AUTH_VIDEOS, videos });
export const getAuthVideos = () => (dispatch) => {
    dispatch(setAuthVideos(authAPI.getVideos()));
}

export const setAuthHeaderData = (tags, blueChannels, subs, notifications, searchOptions, videos, myChannels) => 
({ type: SET_AUTH_HEADER_DATA, data:{ tags, blueChannels, subs, notifications, searchOptions, videos, myChannels } });
export const getAuthHeaderData = () => (dispatch) => {
    dispatch(setAuthHeaderData(
        authAPI.getTags(),
        authAPI.getBlueChannels(),
        authAPI.getSubs(),
        authAPI.getNotifications(),
        authAPI.getSearchOptions(),
        authAPI.getVideos(),
        authAPI.getMyChannels()
    ));
}

export default authReducer;