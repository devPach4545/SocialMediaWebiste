import { api } from "../../config/api";
import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHATS_REQUEST,
  GET_ALL_CHATS_SUCCESS,
    GET_ALL_CHATS_FAILURE,
} from "./msg.actionType";

export const createMsg = (reqData ) => async (dispatch) => {
  dispatch({ type: CREATE_MESSAGE_REQUEST });
  try {
    const { data } = await api.post(`/api/messages/chat/${reqData.messageObject.chatId}`,reqData.messageObject);
    reqData.sendMessageToServer(data);
    console.log("Created message: ", data);
    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error creating message: ", error.message);
    dispatch({ type: CREATE_MESSAGE_FAILURE, payload: error.message });
  }
};

export const createChat = (chat) => async (dispatch) => {
  dispatch({ type: CREATE_CHAT_REQUEST });
  try {
    const { data } = await api.post("/api/chats", chat);
    console.log("Created chat: ", data);
    dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error creating chat: ", error.message);
    dispatch({ type: CREATE_CHAT_FAILURE, payload: error.message });
  }
};

export const getAllChats = (message) => async (dispatch) => {
  dispatch({ type: GET_ALL_CHATS_REQUEST });
  try {
    const { data } = await api.get("/api/chats",message);
    console.log("All chats: ", data);
    dispatch({ type: GET_ALL_CHATS_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error getting all chats: ", error.message);
    dispatch({ type: GET_ALL_CHATS_FAILURE, payload: error.message });
  }
};
