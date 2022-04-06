const EventModel = require("../models/EventSchema");

// Create events
exports.createEvent = async function (req, res) {
  const { name, startTime, duration } = req.body;
  // we can use JOI validation here, bit for now just added simple check.
  if (!(name && startTime && duration)) {
    return res.json({
      success: false,
      status: 400,
      message: "Please Provide all the details",
    });
  }

  const event = await new EventModel({
    name,
    startTime,
    duration,
  });
  await event.save();

  return res.json({
    success: true,
    data: event,
    status: 200,
    message: "Event created successfull",
  });
};

// Get events in 2 section upcoming and live events.
exports.getEvents = async function (req, res) {
  const currentTime = Math.ceil(new Date().getTime() / 1000);
  const upcomingEvents = await EventModel.find()
    .where("startTime")
    .gte(currentTime);

  // 10 min
  const preEvent = 600000;
  const query = EventModel.find();

  query.$where(function () {
    return (
      this.startTime - preEvent < currentTime &&
      this.startTime + this.duration > currentTime
    );
  });

  const liveEvents = await query.exec();

  return res.json({
    success: true,
    status: 200,
    upcomingEvents,
    liveEvents,
    message: "successfull",
  });
};
