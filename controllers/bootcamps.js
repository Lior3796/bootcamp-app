
const Bootcamp = require("../models/Bootcamp");

// @desc    get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  public

exports.getBootcamps = (req, res, next) => {
    res.send({ success: true, msg: "Show all bootcamp" })
}

// @desc    get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  public

exports.getBootcamp = (req, res, next) => {
    res.send({ success: true, msg: `show all bootcamp ${req.params.id}` })

}

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private

exports.createNewBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({ success: true, data: bootcamp })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false })
    }


}

// @desc    update single bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

exports.updateBootcamp = (req, res, next) => {
    res.send({ success: true, msg: `Update bootcamp ${req.params.id}` })

}

// @desc    delete single bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private

exports.deleteBootcamp = (req, res, next) => {
    res.send({ success: true, msg: `Delete bootcamp ${req.params.id}` })

}
