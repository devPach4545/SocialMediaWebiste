import axios from "axios";
import { API_URL, api } from "../../config/api";
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    // Send a POST request to the API endpoint for user login
    const { data } = await axios.post(`${API_URL}/auth/signin`, loginData.data);

    // If a JWT token is received in the response, store it in local storage
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    // Log the received data to the console
    console.log("log in success", data);

    // Dispatch a success action with the received data as payload
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.jwt,
    });
  } catch (error) {
    // If an error occurs, dispatch a failure action with the error response data as payload
    console.log("error", error);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error,
    });
  }
};

// Action to register a new user
export const registerUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    // Send a POST request to the API endpoint for user registration
    const { data } = await axios.post(`${API_URL}/auth/signup`, loginData.data);

    // If a JWT token is received in the response, store it in local storage
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    // Log the received data to the console
    console.log("register success", data);

    // Dispatch a success action with the received data as payload
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.jwt,
    });
  } catch (error) {
    // If an error occurs, dispatch a failure action with the error response data as payload
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response.data,
    });
  }
};

export const getProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    // Send a POST request to the API endpoint for user registration
    const { data } = await axios.get(`${API_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    // Log the received data to the console
    console.log("User Profile ----- ", data);

    // Dispatch a success action with the received data as payload
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // If an error occurs, dispatch a failure action with the error response data as payload
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: error.response.data,
    });
  }
};

export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    // Send a Put request to the API endpoint for user registration
    const { data } = await api.put(`${API_URL}/api/users`, reqData);
    // Log the received data to the console
    console.log("updated Profile ----- ", data);

    // Dispatch a success action with the received data as payload
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // If an error occurs, dispatch a failure action with the error response data as payload
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response.data,
    });
  }
};

export const searchUserAction = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const {data} = await api.get(`/api/users/search?query=${query}`);
    console.log("search user success", data);
    dispatch({
      type: SEARCH_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_USER_FAILURE,
      payload: error,
    });
  }
}

export const logoutUserAction = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try{
   await api.post(`/auth/logout`);

   dispatch({
     type: LOGOUT_SUCCESS,
   });
   localStorage.removeItem('jwt');
   window.location.reload();
    
  }
  catch(error){
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error,
    });
  }

}