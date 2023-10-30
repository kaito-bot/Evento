import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./event-card.component";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

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
    <>
      {events && events.length > 0 ? (
        events.map((event) => (
          <Grid item>
            <EventCard event={event} key={event._id} />
          </Grid>
        ))
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default Events;
