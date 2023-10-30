import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Button } from "@mui/material";

export default function EventCard(props) {
  const { title, description, category, location, startDate, imageUrl, time } =
    props.event;
  return (
    <Card orientation="horizontal" variant="outlined" sx={{ width: 600 }}>
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 200 }}>
          <img
            src={imageUrl}
            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography
          fontSize="1.2rem"
          fontWeight="bold"
          textColor="success.plainColor"
        >
          {title}
        </Typography>
        <Typography level="body-sm" fontWeight="medium" fontFamily="Segoe UI">
          {description}
        </Typography>
        <Typography level="body-sm">Location: {location}</Typography>
        <Typography level="body-sm">Time: {time}</Typography>
        <Button sx={{ mt: 2 }} variant="outlined" href="">
          RSVP Now
        </Button>
      </CardContent>
      <CardOverflow
        variant="soft"
        color="primary"
        sx={{
          px: 0.2,
          writingMode: "vertical-rl",
          textAlign: "center",
          fontSize: "xs",
          fontWeight: "xl",
          letterSpacing: "1px",
          textTransform: "uppercase",
          borderLeft: "1px solid",
          borderColor: "divider",
        }}
      >
        Get your Ticket
      </CardOverflow>
    </Card>
  );
}
