import React from "react";

import { Card, Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
const Authentication = () => {
  return (
    <div>
      <Grid container>
        <Grid className="h-screen w-screen">
          <img
            className="h-full w-full"
            src="/login_background.jpg"
            alt="background"
          />
          <Grid className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col justify-center h-full">
              <Card className="p-5">
                <div className="flex flex-col ">
                  <h1 className="logo text-center">Devsta </h1>
                  <p className="text-center text-sm">
                    Welcome to my Social media app
                  </p>
                </div>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Register />} />
                </Routes>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
