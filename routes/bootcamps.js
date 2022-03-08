const router = require("express").Router();
const courseRouter = require("./courses");
const { getBootcamps,
    updateBootcamp,
    deleteBootcamp,
    createNewBootcamp,
    getBootcampByDistance,
    getBootcamp } = require("../controllers/bootcamp");

router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance")
    .get(getBootcampByDistance)

router.route("/")
    .get(getBootcamps)
    .post(createNewBootcamp);

router.route("/:id")
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;