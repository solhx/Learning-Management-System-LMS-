"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersAnalytics = exports.getCoursesAnalytics = exports.getUserAnalytics = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catshAsyncError_1 = require("../middleware/catshAsyncError");
const analytics_generator_1 = require("../utils/analytics.generator");
const user_model_1 = __importDefault(require("../models/user.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
// get user analytics --- only for admin
exports.getUserAnalytics = (0, catshAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const users = await (0, analytics_generator_1.generateMonthlyAnalytics)(user_model_1.default);
        res.status(200).json({
            success: true,
            users,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get Courses analytics --- only for admin
exports.getCoursesAnalytics = (0, catshAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const courses = await (0, analytics_generator_1.generateMonthlyAnalytics)(course_model_1.default);
        res.status(200).json({
            success: true,
            courses,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get Orders analytics --- only for admin
exports.getOrdersAnalytics = (0, catshAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const orders = await (0, analytics_generator_1.generateMonthlyAnalytics)(order_model_1.default);
        res.status(200).json({
            success: true,
            orders,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
