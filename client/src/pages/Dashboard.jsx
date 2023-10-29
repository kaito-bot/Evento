import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavigationBar from "../components/navigation-bar.component";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Events from "../components/events.component";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:3000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);

      return status
        ? console.log("hi")
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <>
      <div>
        <NavigationBar logout={Logout} />

        <Grid container direction="row" sx={{ marginTop: "15vh" }}>
          <Grid id="filters" item sm={2}>
            <Box sx={{ height: "100%", position: "fixed" }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="space-around"
              >
                <Grid item>
                  <TextField
                    id="standard-basic"
                    label="Location"
                    variant="standard"
                  />
                  <Box sx={{ marginTop: 5 }}>
                    <Button fullWidth variant="text">
                      Apply
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid id="event-container" item sm={10}>
            <Card>
              <CardContent>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={5}
                >
                  <Events />
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      <ToastContainer />
    </>
  );
};

export default Dashboard;
