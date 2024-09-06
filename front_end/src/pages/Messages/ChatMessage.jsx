import React from "react";
import { useSelector } from "react-redux";

const ChatMessage = ({item}) => {
    const {auth, msg} = useSelector(store => store);

    // If both ids are the same then the message is made by the logged in user
    const isReqUserMsg = auth.user?.id === item.user?.id
  return (
    <div className={`flex ${!isReqUserMsg ? "justify-start" : "justify-end"}`}>
      <div
        className={`p-1 ${item.img ? "rounded-md" : "px-5 rounded-full"} 
        bg-[#2c3774] text-white`}
      >
       
        <p className={`${true ? "py-2" : "py-1"}`}>{item.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
