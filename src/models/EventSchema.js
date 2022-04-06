const Mongoose = require("mongoose");

const EventSchema = Mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  // will store unix time stamp.
  startTime: {
    type: Number,
    require: true,
  },
  // will store unix time stamp for duration.
  duration: {
    type: Number,
    require: true,
  },
});

module.exports = Mongoose.model("Event", EventSchema);
