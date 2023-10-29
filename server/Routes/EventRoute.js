const {
  CreateEvent,
  GetAllEvents,
  GetAllEventsByFilter,
} = require("../Controllers/EventController");

const router = require("express").Router();

router.post("/createEvent", CreateEvent);
router.get("", GetAllEvents);
router.get("/eventsbyfilter", GetAllEventsByFilter);
module.exports = router;
