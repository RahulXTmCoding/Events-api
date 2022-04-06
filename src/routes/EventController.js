const router = require("express").Router();
const service = require("../service/EventServices");
router.route("/create").post(service.createEvent);
router.route("/get").get(service.getEvents);

module.exports = router;
