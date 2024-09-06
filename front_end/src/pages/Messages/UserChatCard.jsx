import { MoreHoriz } from "@mui/icons-material";
import { CardHeader, IconButton, Card } from "@mui/material";
import MoreHorizeIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
const UserChatCard = ({chat}) => {

  const {msg, auth} = useSelector(store => store);
  
  return (
    <Card >
    <CardHeader
   
      avatar={
        <Avatar
          sx={{
            width: "3.5rem",
            height: "3.5rem",
            bgcolor: "#191c29",
            color: "rgb(88,199,250)",
          }}
          src="https://cdn.pixabay.com/photo/2017/08/13/18/58/joker-2638234_640.png"
        />
      }
      action={<IconButton>
        <MoreHorizeIcon />
      </IconButton>}
      title={auth.user.id === chat.users[0].id? chat.users[1].firstName + " " + chat.users[1].lastName: chat.users[0].firstName + " " + chat.users[0].lastName}
      //subheader={}
    ></CardHeader>
    </Card>

  );
};

export default UserChatCard;
