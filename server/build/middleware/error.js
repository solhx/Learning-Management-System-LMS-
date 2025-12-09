"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server eroor";
    // wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resource not found , invalid ${err.path}`;
        err = new ErrorHandler_1.default(message, 400);
    }
    //Duplicate key eror
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.KeyValue)} entered`;
        err = new ErrorHandler_1.default(message, 400);
    }
    // wrong Jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler_1.default(message, 400);
    }
    // Jwt expired error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired, try again`;
        err = new ErrorHandler_1.default(message, 400);
    }
    res.status(err.statusCode).json({
        succes: false,
        message: err.message,
    });
};
exports.ErrorMiddleware = ErrorMiddleware;
