import { getCoursesAnalytics, getOrdersAnalytics } from './../controllers/analytics.controller';
import express  from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getUserAnalytics } from "../controllers/analytics.controller";
const analyticRouter = express.Router();




analyticRouter.get('/get-users-analytics',isAutheticated,authorizeRoles("admin"),getUserAnalytics);

analyticRouter.get('/get-course-analytics',isAutheticated,authorizeRoles("admin"),getCoursesAnalytics);

analyticRouter.get('/get-orders-analytics',isAutheticated,authorizeRoles("admin"),getOrdersAnalytics);

export default analyticRouter;