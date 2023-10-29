const {
  CreateEvent,
  GetAllEvents,
  GetAllEventsByDate,
} = require("../Controllers/EventController");

const router = require("express").Router();

router.post("/createEvent", CreateEvent);
router.get("", GetAllEvents);
router.get("/eventsdate", GetAllEventsByDate);
module.exports = router;
