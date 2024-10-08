import {
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHATS_SUCCESS,
} from "./msg.actionType";
const initialState = {
  messages: [],
  chats: [],
  loading: false,
  error: null,
  message: null,
};

export const msgReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        chats: [...state.chats, action.payload],
      };
    case GET_ALL_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload,
      };
    default:
      return state;
  }
};
