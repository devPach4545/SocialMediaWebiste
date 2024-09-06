import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_POSTS_FAILURE,
  CREATE_POSTS_REQUEST,
  CREATE_POSTS_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_POSTS_FAILURE,
  DELETE_POSTS_REQUEST,
  DELETE_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_USER_POSTS_FAILURE,
  GET_USER_POSTS_REQUEST,
  GET_USER_POSTS_SUCCESS,
  LIKE_POSTS_FAILURE,
  LIKE_POSTS_REQUEST,
  LIKE_POSTS_SUCCESS,
} from "./post.actionType";

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  like: null,
  comments: [],
  newComment: null,
};
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS_REQUEST:
    case GET_USER_POSTS_REQUEST:
    case LIKE_POSTS_REQUEST:
    case CREATE_POSTS_REQUEST:
    case DELETE_POSTS_REQUEST:
    case CREATE_COMMENT_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        comments: action.payload.comments,
        loading: false,
        error: null,
      };
    case GET_USER_POSTS_SUCCESS:
      return { ...state, posts: action.payload, loading: false, error: null };
    case LIKE_POSTS_SUCCESS:
      return {
        ...state,
        like: action.payload,
        loading: false,
        error: null,
        posts: state.posts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case CREATE_POSTS_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
        posts: [action.payload, ...state.posts],
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        newComment: action.payload,
      };

    case DELETE_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== action.payload.id), // Remove the deleted post from the posts array
        error: null,
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) => ({
          ...post,
          comments: post.comments.filter(
            (comment) => comment.id !== action.payload.id
          ),
        })),
        error: null,
      };

    case GET_ALL_POSTS_FAILURE:
    case GET_USER_POSTS_FAILURE:
    case LIKE_POSTS_FAILURE:
    case CREATE_POSTS_FAILURE:
    case DELETE_POSTS_FAILURE:
    case DELETE_COMMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
