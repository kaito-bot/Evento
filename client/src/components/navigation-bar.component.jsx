import * as React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const NavigationBar = (props) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h4" component="div" sx={{ mr: 2 }}>
          Evento
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ justifyContent: "space-between" }}
        >
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit" onClick={props.logout}>
            LogOut
          </Button>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
