const ErrorResponse = require("../utills/ErrorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    console.log(err);

    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }
    if (err.code === 11000) {
        const message = `duplicate key error`;
        error = new ErrorResponse(message, 404);
    }
    if (err.code === "ValidatorError") {
        const message = Object.values(err.errors).map(err => err.message).join(': ');
        error = new ErrorResponse(message, 400)
    }


    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server error"
    })
}

module.exports = errorHandler;