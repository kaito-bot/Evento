import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavigationBar from "../components/navigation-bar.component";
import SideDrawer from "../components/side-drawer.component";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Events from "../components/events.component";

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
      <div className="dashboardPage">
        <NavigationBar logout={Logout} />
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box>
              <SideDrawer />
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                p: 0,

                bgcolor: "pink",
                borderRadius: 1,
                flexGrow: 1,
                height: "100vh",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 10,
                  mt: 10,
                  bgcolor: "red",
                  borderRadius: 1,
                  width: "80%",
                  height: 400,
                }}
              >
                <Events />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
