import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/material/Typography";

export default function EventCard(props) {
  const { title, description, category, location, startDate, imageUrl } =
    props.event;
  return (
    <Card orientation="horizontal" variant="outlined" sx={{ width: 500 }}>
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
        <Typography fontWeight="md" textColor="success.plainColor">
          {title}
        </Typography>
        <Typography level="body-sm">California, USA</Typography>
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
        Ticket
      </CardOverflow>
    </Card>
  );
}

// export const EventCard = (props) => {
//   const { title, description, category, location, startDate, imageUrl } =
//     props.event;
//   return (
//     <div className="event">
//       <div className="event-card">
//         <img src={imageUrl} alt="event" className={"images"} />
//         <div className="event-details">
//           <p className="title">{title}</p>
//           <p className="description">{description}...</p>
//           <p>#{category}</p>
//           <p>{location}</p>
//           <p className="event-date">{new Date(startDate).toDateString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };
