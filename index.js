const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const EventRouter = require("./src/routes/EventController");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "*", credentials: true }));

mongoose.connect("mongodb://localhost:27017/Events", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("db Connection established");
});

const port = process.env.PORT || 4000;

app.use("/event", EventRouter);

app.listen(port, () => {
  console.log("Server is listening at :" + port);
});
