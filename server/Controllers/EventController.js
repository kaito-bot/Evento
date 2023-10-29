const Events = require("../Models/EventsModel");

module.exports.CreateEvent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      date,
      time,
      category,
      location,
      imageUrl,
      createdAt,
    } = req.body;
    const existingEvent = await Events.findOne({ title });
    if (existingEvent) {
      return res.json({ message: "Event already exists" });
    }
    const eventCreated = await Events.create({
      title,
      description,
      date,
      time,
      category,
      location,
      imageUrl,
      createdAt,
    });
    res.status(201).json({
      message: "Event created successfully",
      success: true,
      eventCreated,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.GetAllEvents = async (req, res, next) => {
  try {
    // fetch all events sorting by the date on which it is created
    const allEvents = await Events.aggregate([{ $sort: { createdAt: 1 } }]);

    res.status(201).json({
      message: "Events fetched successfully",
      success: true,
      allEvents,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.GetAllEventsByDate = async (req, res, next) => {
  try {
    const { searchDate } = req.body;
    // fetch all events that has date as searchDate
    let eventsByDate = await Events.find({
      date: searchDate,
    });
    console.log(eventsByDate);
    if (eventsByDate == []) {
      return res.json({
        message: `No event found for the date: ${searchDate}`,
      });
    }

    res.status(201).json({
      message: "Events by date fetched successfully",
      success: true,
      eventsByDate,
    });
  } catch (error) {
    console.error(error);
  }
};
