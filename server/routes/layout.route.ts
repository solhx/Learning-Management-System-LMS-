import  express  from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createLayout, editLayout, getLayoutByType } from "../controllers/layout.controller";
import { updateAccessToken } from "../controllers/user.controller";
const layoutRouter = express.Router();

layoutRouter.get("/get-layout/:type", getLayoutByType);

// Protected routes - only admin can create/edit
layoutRouter.post(
  "/create-layout",
  isAutheticated,
  authorizeRoles("admin"),
  createLayout
);

layoutRouter.put(
  "/edit-layout",
  isAutheticated,
  authorizeRoles("admin"),
  editLayout
);

export default layoutRouter;