import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../Redux/Auth/auth.action";
import { createChat } from "../../Redux/Message/msg.action";
const SearchUser = () => {
  const [username, setUserName] = React.useState("");
  const dispatch = useDispatch();
  const { msg, auth } = useSelector(store => store);

  const handleSearchUser = (e) => {
    setUserName(e.target.value);
    console.log("you searched for: ",e.target.value);
    dispatch(searchUserAction(username));
  };
  const handleClick = (id) => {
   dispatch(createChat({userId:id}));
  };
  return (
    <div>
      <div className="py-5 relative">
        <input
          type="text"
          className="bg-transparent border border-[#3b4054 outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search user..."
          onChange={handleSearchUser}
        />
        {username &&
          auth.searchUser.map((item) => (
            <Card key={item.id} className="absolute w-full z-10 top-[4.5rem]">
              <CardHeader
                onClick={() => {
                  handleClick(item.id);
                  setUserName("");
                }}
                avatar={
                  <Avatar src="https://cdn.pixabay.com/photo/2024/01/25/10/50/mosque-8531576_1280.jpg" />
                }
                title={item.firstName + " " + item.lastName}
                subheader={"@" + item.firstName.toLowerCase() + "_" + item.lastName.toLowerCase()}
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
