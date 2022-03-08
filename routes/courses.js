const router = require("express").Router({ mergeParams: true });
const { getCourses } = require("../controllers/course");

router.route("/")
    .get(getCourses);

module.exports = router;