
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import WestIcon from "@mui/icons-material/West";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stom from "stompjs";
import SearchUser from "../../components/SearchUser/SearchUser";
import { createMsg, getAllChats } from "../../Redux/Message/msg.action";
import ChatMessage from "./ChatMessage";
import UserChatCard from "./UserChatCard";
import { useNavigate } from "react-router-dom";
const Message = () => {
  const dispatch = useDispatch();
  const { msg, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const chatContainerRef = React.useRef(null);
  useEffect(() => {
    dispatch(getAllChats());
  },[]);


  const handleCreateMsg = (value) => {
    const messageObject = {
      chatId: currentChat?.id,
      message: value,
      image: selectedImage,
    };
    dispatch(createMsg({messageObject, sendMessageToServer}));
  };

  useEffect(() => {
    setMessages([...messages, msg.message]);
  }, [msg.message]);

  const [stompClient, setStomClient] = React.useState(null);

  useEffect(() => {
    // client will connect to server
    const socket = new SockJS("http://localhost:5454/ws");
    const stomp = Stom.over(socket);
    setStomClient(stomp);

    stomp.connect({}, onConnect, OnError);
  },[]);

  const onConnect = () => {
    console.log("Connected to server......");
  };

  const OnError = (error) => {
    console.log("Error in connection", error);
  };

  useEffect(() => {
    if (stompClient && auth.user && currentChat) {
      const subs = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        onMessageReceived
      );
    }
  });
  const navigate = useNavigate();
  
  const handleNavigate = () =>{
    navigate("/");
  }

  const sendMessageToServer = (newMessage) => {
    if(stompClient && newMessage){
      stompClient.send(`/app/chat/${currentChat.id}`, {}, JSON.stringify(newMessage));
    }
  }

  const onMessageReceived = (newMsg) => {
   
    const receivedMsg = JSON.parse(newMsg.body);
    console.log("Message received from websocket", receivedMsg);
    setMessages([...messages, receivedMsg]);

  }

  useEffect(() => {
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  },[messages]);
  return (
    <div className="bg-gradient-to-br from-orange-200 to-purple-700">
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2 ">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon onClick={handleNavigate} className="cursor-pointer"/>
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div className="">
                  <SearchUser />
                </div>

                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
                  {msg.chats.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          setCurrentChat(item);
                          setMessages(item.messages);
                        }}
                      >
                        <UserChatCard chat={item} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-l p-5">
                <div className="flex items-center space-x-3">
                  <Avatar src="https://cdn.pixabay.com/photo/2023/09/04/17/53/pelican-8233306_640.jpg" />
                  <p>
                    {auth.user.id === currentChat.users[0].id
                      ? currentChat.users[1].firstName +
                        " " +
                        currentChat.users[1].lastName
                      : currentChat.users[0].firstName +
                        " " +
                        currentChat.users[0].lastName}
                  </p>
                </div>

                  
              </div>
              <div ref={chatContainerRef} className="hideScrollBar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
                {messages.map((item) => (
                  <ChatMessage item={item} />
                ))}
              </div>
              <div className="sticky bottom-0 border-l">
                <div className="flex items-center space-x-3 p-5">
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMsg(e.target.value);
                        setSelectedImage(null);
                      }
                    }}
                    className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
                    type="text"
                    placeholder="Type a message"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col items-center">
              <ChatBubbleIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold">No chat selected</p>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Message;
