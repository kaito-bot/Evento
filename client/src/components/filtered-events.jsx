import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./event-card.component";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

const FilteredEvents = (props) => {
  const { loading, filteredEvents } = props;
  return (
    <>
      {filteredEvents && filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <Grid item>
            <EventCard event={event} key={event._id} />
          </Grid>
        ))
      ) : (
        <p>
          <h4>No Events Found</h4>
        </p>
      )}
    </>
  );
};

export default FilteredEvents;
