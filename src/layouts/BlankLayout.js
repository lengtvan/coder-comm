import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/logo";

function BlankLayout() {
  return (
    <div>
      <Stack minHeight="100vh" justifyContent="center" alignItems="center">
        <Logo sx={{ width: 90, height: 90, mb: 5 }} />
        <Outlet />
      </Stack>
    </div>
  );
}

export default BlankLayout;
