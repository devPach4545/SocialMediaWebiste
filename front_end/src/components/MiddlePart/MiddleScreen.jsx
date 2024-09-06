
import ArticleIcon from "@mui/icons-material/Article";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Avatar, Card } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../Redux/Post/post.action";

import PostCard from "../Posts/PostCard";


const MiddleScreen = () => {
  const dispatch = useDispatch();

   const { post } = useSelector(store => store);
   console.log("post", post);
 
  useEffect(() => {
    dispatch(getAllPostAction());
  },[post.newComment]);
  return (
    <div className="px-20">
      
      <div className="mt-5 space-y-5">
        {post.posts.map((item) => 
          <PostCard item={item}/>
        )} 
      </div>
      
    </div>
  );
};

export default MiddleScreen;
