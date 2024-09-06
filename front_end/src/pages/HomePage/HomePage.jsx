import { Grid } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Route, Routes } from "react-router-dom";
import MiddleScreen from "../../components/MiddlePart/MiddleScreen";
import SideBar from "../../components/Sidebar/SideBar";
import ProfilePage from "../../Profile/ProfilePage";

import { useSelector } from "react-redux";
const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  console.log("First name: ", auth);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <Grid >
        <Grid item lg={3} xs={0} className="sticky top-0 z-10">
          <div >
          <SideBar />
          </div>
        </Grid>

        <Grid
          item
          className="px-5 flex items-center justify-center"
          xs={12}
          lg={location.pathname === "/" ? 6 : 9}
        >
          <Routes>
            <Route path="/" element={<MiddleScreen />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
