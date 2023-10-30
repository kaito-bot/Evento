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
import { Route, Routes } from "react-router-dom";
import FilteredEvents from "../components/filtered-events";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [filterValues, setFilterValue] = useState({
    location: "",
    date: "",
    category: "",
  });
  const [{ loading, filteredEvents }, setFilteredEvents] = useState({
    loading: true,
    filteredEvents: null,
  });

  const [buttonClicked, setButtonClicked] = useState(false);

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

  const { location, date, category } = filterValues;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFilterValue({
      ...filterValues,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:3000/events/eventsbyfilter",

        { params: filterValues, withCredentials: true }
      );
      const { success, message, eventsByFilter } = data;
      setFilteredEvents({
        loading: false,
        filteredEvents: eventsByFilter,
      });
      setButtonClicked(true);
      setFilterValue({
        ...filterValues,
        location: "",
        date: "",
        category: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
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
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  sx={{ m: 1 }}
                >
                  {/*location filter*/}
                  <Grid item>
                    <TextField
                      name="location"
                      label="Location"
                      variant="standard"
                      value={location}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  {/* date filter */}
                  <Grid item>
                    <TextField
                      name="date"
                      label="dd/mm/yyyy"
                      variant="standard"
                      value={date}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      name="category"
                      label="Category"
                      variant="standard"
                      value={category}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Box sx={{ marginTop: 5 }}>
                    <Button fullWidth variant="text" type="submit">
                      Apply
                    </Button>
                  </Box>
                </Grid>
              </form>
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
                  {buttonClicked ? (
                    <FilteredEvents
                      loading={loading}
                      filteredEvents={filteredEvents}
                    />
                  ) : (
                    <Events />
                  )}
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
