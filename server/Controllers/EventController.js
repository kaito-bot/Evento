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
    const allEvents = await Events.aggregate([{ $sort: { createdAt: -1 } }]);

    res.status(201).json({
      message: "Events fetched successfully",
      success: true,
      allEvents,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.GetAllEventsByFilter = async (req, res, next) => {
  try {
    const { date, category, location } = req.query;

    // Create an empty filter object
    const filter = {};

    // Check if date is provided and add it to the filter
    if (date) {
      filter.date = date;
    }

    // Check if category is provided and add it to the filter
    if (category) {
      filter.category = category;
    }

    // Check if location is provided and add it to the filter
    if (location) {
      filter.location = location;
    }
    console.log(filter);
    // Use the filter object to find events
    let eventsByFilter = await Events.find(filter);

    console.log(eventsByFilter);

    res.status(200).json({
      message: "Events by filter fetched successfully",
      success: true,
      eventsByFilter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching events by filter",
      success: false,
    });
  }
};
