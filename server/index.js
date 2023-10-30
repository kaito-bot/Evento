const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const eventRouter = require("./Routes/EventRoute");
const { MONGO_URL, PORT } = process.env;
const { MongoClient } = require("mongodb");

// Create Instance of MongoClient for mongodb
const client = new MongoClient(MONGO_URL);

// Connect to database
// client
//   .connect()
//   .then(() => console.log("Connected Successfully"))
//   .catch((error) => console.log("Failed to connect", error));

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);
app.use("/events", eventRouter);
