"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const analytics_controller_1 = require("./../controllers/analytics.controller");
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const analytics_controller_2 = require("../controllers/analytics.controller");
const analyticRouter = express_1.default.Router();
analyticRouter.get('/get-users-analytics', auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), analytics_controller_2.getUserAnalytics);
analyticRouter.get('/get-course-analytics', auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), analytics_controller_1.getCoursesAnalytics);
analyticRouter.get('/get-orders-analytics', auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), analytics_controller_1.getOrdersAnalytics);
exports.default = analyticRouter;
