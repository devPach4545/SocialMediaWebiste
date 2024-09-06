import { API_URL, api } from "../../config/api";
import { 
    GET_ALL_POSTS_REQUEST,
    GET_ALL_POSTS_SUCCESS,
    GET_ALL_POSTS_FAILURE,
    LIKE_POSTS_REQUEST,
    LIKE_POSTS_SUCCESS,
    LIKE_POSTS_FAILURE,
    GET_USER_POSTS_REQUEST,
    GET_USER_POSTS_SUCCESS,
    GET_USER_POSTS_FAILURE,
    CREATE_POSTS_REQUEST,
    CREATE_POSTS_SUCCESS,
    CREATE_POSTS_FAILURE,
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
    DELETE_POSTS_REQUEST,
    DELETE_POSTS_SUCCESS,
    DELETE_POSTS_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
} from "./post.actionType";

export const createPostAction = (post) => async (dispatch) => {
  dispatch({ type: CREATE_POSTS_REQUEST });
  try {
    const { data } = await api.post("/api/posts", post.data);

    dispatch({
      type: CREATE_POSTS_SUCCESS,
      payload: data,
    });
    console.log("post created", data);
  } catch (error) {
    console.log("Error", error);
    dispatch({
      type: CREATE_POSTS_FAILURE,
      payload: error,
    });
  }
};

export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POSTS_REQUEST });
  try {
    const { data } = await api.get("/api/posts");

    dispatch({
      type: GET_ALL_POSTS_SUCCESS,
      payload: data,
    });
    console.log("Got all posts", data);
  } catch (error) {
    console.log("Error", error);
    dispatch({
      type: GET_ALL_POSTS_FAILURE,
      payload: error,
    });
  }
};

export const getUserPostAction = (userId) => async (dispatch) => {
    dispatch({ type: GET_USER_POSTS_REQUEST });
    try {
      const { data } = await api.get(`/api/posts/user/${userId}`);
  
      dispatch({
        type: GET_USER_POSTS_SUCCESS,
        payload: data,
      });
      console.log("Got all posts", data);
    } catch (error) {
      console.log("Error", error);
      dispatch({
        type: GET_USER_POSTS_FAILURE,
        payload: error,
      });
    }
  };

  export const likePostAction = (postId) => async (dispatch) => {
    dispatch({ type: LIKE_POSTS_REQUEST });
    try {
      const { data } = await api.put(`/api/posts/like/${postId}`);
  
      dispatch({
        type: LIKE_POSTS_SUCCESS,
        payload: data,
      });
      console.log("like posts", data);
    } catch (error) {
      console.log("Error", error);
      dispatch({
        type: LIKE_POSTS_FAILURE,
        payload: error,
      });
    }
  };
  

  export const deletePostAction = (postId) => async (dispatch) => {
    dispatch({ type: DELETE_POSTS_REQUEST });
    try {
      const { data } = await api.delete(`/api/posts/${postId}`);
  
      dispatch({
        type: DELETE_POSTS_SUCCESS,
        payload: data,
      });
      console.log("delete posts", data);
    } catch (error) {
      console.log("Error", error);
      dispatch({
        type: DELETE_POSTS_FAILURE,
        payload: error,
      });
    }
  }

  export const createCommentAction = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    try {
      const { data } = await api.post(`/api/comments/post/${reqData.postId}`, reqData.data);
  
      dispatch({
        type: CREATE_COMMENT_SUCCESS,
        payload: data,
      });
      console.log("comment created", data);
    } catch (error) {
      console.log("Error", error);
      dispatch({
        type: CREATE_COMMENT_FAILURE,
        payload: error,
      });
    }
  };

  export const deleteCommentAction = (postId, commentId) => async (dispatch) => {
    dispatch({ type: DELETE_COMMENT_REQUEST });
    try {
      const { data } = await api.delete(`/api/posts/${postId}/comments/${commentId}`);
  
      dispatch({
        type: DELETE_COMMENT_SUCCESS,
        payload: data,
      });
      console.log("delete comment", data);
    } catch (error) {
      console.log("Error", error);
      dispatch({
        type: DELETE_COMMENT_FAILURE,
        payload: error,
      });
    }
  }
