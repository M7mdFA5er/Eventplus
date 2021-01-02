import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";

function NavBar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ maxWidth: "40px", marginRight: "10px" }}
          />
          <Typography variant="h6">Activities</Typography>
          <Button color="inherit">Create Activties</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
