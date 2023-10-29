import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./event-card.component";
import { Box } from "@mui/material";

export const Events = () => {
  const [{ loading, events }, setEventManagerState] = useState({
    loading: true,
    events: null,
  });

  useEffect(() => {
    if (events) {
      return;
    }

    axios
      .get("http://localhost:3000/events")
      .then((res) => {
        setEventManagerState({
          loading: false,
          events: res.data.allEvents,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [events]);
  console.log(events);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Horizontally center the content
        alignItems: "center",
        mt: 10,
        bgcolor: "red",
        borderRadius: 1,
        width: "100%",
        height: 300,
        overflow: "auto",
      }}
      className="event-container"
    >
      {events && events.length > 0 ? (
        events.map((event) => <EventCard event={event} key={event._id} />)
      ) : (
        <p>loading...</p>
      )}
    </Box>
  );
};

export default Events;
