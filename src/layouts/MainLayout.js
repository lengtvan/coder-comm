import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Box } from "@mui/system";
import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  return (
    <div>
      <Stack sx={{ minHeight: "100vh" }}>
        <MainHeader />
        <AlertMsg/>
        <Outlet />
        <Box sx={{ flexGrow: 1 }}></Box>
        <MainFooter />
      </Stack>
    </div>
  );
}

export default MainLayout;
