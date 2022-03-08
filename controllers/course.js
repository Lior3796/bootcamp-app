const Course = require("../models/Course");
const ErrorResponse = require("../utills/ErrorResponse");
const asyncHandler = require("../middleware/async");

// @desc    get all courses
// @route   GET /api/v1/:bootcampId/courses
// @access  public

exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId })
    } else {
        query = Course.find().populate({
            path: "bootcamp",
            select: "slug"
        });
    }
    let courses = await query;
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
})