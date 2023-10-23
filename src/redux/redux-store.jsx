import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer} from 'redux-form';
import authReducer from './auth-reducer';
import modalReducer from './modal-reducer';
import { configureStore } from '@reduxjs/toolkit';
import theme from './theme/themeSlice';
import uiReducer from './ui-reducer';
import videoReducer from './video-reducer';

let reducers = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    form: formReducer,
    theme,
    ui: uiReducer,
    video: videoReducer
});

let store = configureStore({
    reducer: reducers,
    middleware: [thunk],
})

//let store = createStore(reducers, applyMiddleware(thunk));

window.store = store.getState();

export default store;