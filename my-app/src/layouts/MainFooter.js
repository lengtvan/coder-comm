import { Link } from "@mui/material";
import { Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1}>
      {"Copyright @"}
      <Link color="inherit" href="https://coderschool.vn">
        CoderSchool
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default MainFooter;
