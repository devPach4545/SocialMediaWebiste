import { Avatar, Card } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { navigationMenu } from "../Sidebar/SideBarNavigation";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { logoutUserAction } from "../../Redux/Auth/auth.action";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout"; // Import LogoutIcon if not already imported

const SideBar = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserAction()); // Dispatch logout action
      navigate("/login"); // Redirect to home page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleProfileClick = () => {
    navigate(`/profile/${auth.user?.id}`);
  };

  const handleNavigate = (item) => {
    if (item.title === "LogOut") 
      handleLogout();
    else if (item.title === "UploadPic") {
      handleOpenCreatePostModal();
    } else {
      navigate(item.path);
    }
  };

  const [openCreatePostModal, setOpenCreatePostModal] = React.useState(false);
  
  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
    console.log("open modal");
  };

  return (
    <Card className="flex flex-row justify-between items-center">
      
      <div className="flex flex-1 justify-center items-center space-x-10 bg-gradient-to-br from-orange-200 to-purple-700">
        <div className="py-3">
          <span className="logo font-bold text-xl">DevStaGram</span>
        </div>
        {navigationMenu.map((item) => (
          <div
            key={item.title} // Add a key for each item
            onClick={() => handleNavigate(item)}
            className="cursor-pointer flex items-center space-x-2"
          >
            {item.icon}
            <p className="text-sm">{item.title}</p>
          </div>
        ))}

        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-3">
            <Avatar
              src=""
              onClick={handleProfileClick}
              className="cursor-pointer"
            />
            <div>
              <p className="font-bold">
                {auth.user?.firstName + " " + auth.user?.lastName}
              </p>
            </div>
          </div>
        </div>

        {/* User Section */}
      </div>
      <div>
        <CreatePostModal
          open={openCreatePostModal}
          handleClose={handleCloseCreatePostModal}
        />
      </div>
    </Card>
  );
};

export default SideBar;
