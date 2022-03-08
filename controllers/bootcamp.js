const Bootcamp = require("../models/Bootcamp");
const geocoder = require("../utills/geocoder");
const ErrorResponse = require("../utills/ErrorResponse");
const asyncHandler = require("../middleware/async");

// @desc    get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  public

exports.getBootcamps = asyncHandler(async (req, res, next) => {

    let query;
    // copying req.query
    let reqQuery = { ...req.query };

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = Bootcamp.find(JSON.parse(queryStr)).populate("courses");


    // Remove fields
    const removeFields = ["select", "sort", "page", "limit"];
    removeFields.forEach(param => delete reqQuery[param]);

    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;
    const totalDocs = await Bootcamp.countDocuments();
    query.skip(startIndex).limit(limit);

    // pagination object for return pagi option
    const pagination = {}
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
    if (lastIndex < totalDocs) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }





    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ");
        query = query.select(fields);
    }
    if (req.query.sort) {
        console.log('in query sort');
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    } else {
        query = query.sort("-createdAt");

    }

    const bootcamps = await query;
    res.status(200).json({ success: true, count: bootcamps.length, pagination, data: bootcamps })
})

// @desc    get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) return next(new ErrorResponse("Bootcamp not found it DB", 404))
    res.status(200).json({ success: true, data: bootcamp });


})

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private

exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp })
})

// @desc    update single bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!bootcamp) return next(new ErrorResponse("Bootcamp not found it DB", 404))
    res.status(200).json({ success: true, data: bootcamp });



})

// @desc    delete single bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) return next(new ErrorResponse("Bootcamp not found it DB", 404))
    bootcamp.remove();

    res.status(200).json({ success: true, data: {} });

    next(err)



})

// @desc    get bootcamp by zipcode and radius
// @route   get /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private

exports.getBootcampByDistance = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;
    const location = await geocoder.geocode(zipcode); // return array within one object
    console.log(location[0]);
    const { latitude, longitude } = location[0];

    // calculate the radius by km

    const radius = distance / 6371;

    const bootcamp = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[longitude, latitude], radius] } }
    })

    res.status(200).json({
        success: true,
        count: bootcamp.length,
        data: bootcamp
    })
})


