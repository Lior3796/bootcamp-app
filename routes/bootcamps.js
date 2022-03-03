const router = require("express").Router();
const { getBootcamps,
    updateBootcamp,
    deleteBootcamp,
    createNewBootcamp,
    getBootcamp } = require("../controllers/bootcamps");

router.route("/")
    .get(getBootcamps)
    .post(createNewBootcamp);

router.route("/:id")
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;