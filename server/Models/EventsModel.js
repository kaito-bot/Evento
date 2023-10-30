const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Your title is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Your description is required"],
  },
  date: {
    type: String,
    required: [true, "Your date is required"],
  },
  time: {
    type: String,
    required: [true, "Your time is required"],
  },
  category: {
    type: String,
    required: [true, "Your category is required"],
  },
  location: {
    type: String,
    required: [true, "Your location is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  imageUrl: {
    type: String,
    required: [true, "Your ImageUrl is required"],
  },
});

module.exports = mongoose.model("Events", EventsSchema);
