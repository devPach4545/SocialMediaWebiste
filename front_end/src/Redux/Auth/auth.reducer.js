import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  
} from "./auth.actionType";
const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
  searchUser: [],
};
// The purpose of authRedicer is to update the state of the application based on the action type and payload received from the action user
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case LOGOUT_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, jwt: action.payload, loading: false, error: null };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case LOGOUT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT_SUCCESS:
      return { ...state, jwt: null, user: null, loading: false, error: null };

    default:
      return state;
  }
};
