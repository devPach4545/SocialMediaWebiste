import { Card } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import React from "react";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";

const ProfilePage = () => {
  const { auth } = useSelector((store) => store);

  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bio, setBio] = React.useState(auth.user?.bio || "");

  return (
    <Card 
      className="my-10 mx-auto"
      sx={{ 
        width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' }, 
        maxWidth: '1200px' 
      }}
    >
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md object-cover"
            src="https://cdn.pixabay.com/photo/2023/08/23/12/50/fog-8208493_640.jpg"
            alt="background_image"
          />
        </div>
        <div className="px-5 flex items-start justify-between mt-5 h-[5rem] bg-gray-900">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
          />
          
          <Button
            sx={{ borderRadius: "20px" }}
            variant="outlined"
            onClick={handleOpenProfileModal}
          >
            Edit Profile
          </Button>
        </div>

        <div className="p-5 bg-gray-900">
          <div>
            <h1 className="py-1 font-bold text-xl text-blue-500" >
              {auth.user?.firstName + " " + auth.user?.lastName}
            </h1>
            <p className="py-1 text-md text-blue-500">
              @
              {auth.user?.firstName.toLowerCase() +
                "_" +
                auth.user?.lastName.toLowerCase()}
            </p>
          </div>

          
        </div>
      </div>
      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>
  );
};

export default ProfilePage;
