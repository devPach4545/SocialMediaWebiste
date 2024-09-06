import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk';
import { authReducer } from './Auth/auth.reducer';
import { postReducer } from './Post/post.reducer';
import { msgReducer } from './Message/msg.reducer';

// Create a rootReducer by combining multiple reducers using the 'combineReducers' function from 'redux'
// Reducers are functions that specify how the application's state should change in response to actions

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    msg : msgReducer
});


// Create a Redux store using the 'legacy_createStore' function from 'redux'
// Pass the rootReducer as the first argument to the createStore function
// Apply the 'thunk' middleware using the 'applyMiddleware' function from 'redux'
// The 'thunk' middleware allows you to write action creators that return a function instead of an action object
// This is useful for handling asynchronous actions in Redux
// The created store is exported as a named export 'store'

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
