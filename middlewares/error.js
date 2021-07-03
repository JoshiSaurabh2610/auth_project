const ErrorResponse = require('../utils/errorResponse');

const ErrorHandler = (err, req, res, next) => {
    // console.log(err);
    let error = { ...err }
    error.message = err.message;
    if (err.code === 11000) {
        const message = "Duplicate Field Value Enter"
        error = new ErrorResponse(message, 400);
    }

    if (err.name === "Validation Error") {
        const message = Object.values(err.message).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        "sucess": false,
        "error": error.message || "Server Error"
    })
};

export default ErrorHandler;