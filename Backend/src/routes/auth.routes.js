import express from "express";
import { registerUser } from "../controllers/auth.controller.js";
import {loginUser} from "../controllers/auth.controller.js";
import {getProfile} from "../controllers/auth.controller.js";
import { doctorTest } from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js"

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

router.get(
    "/doctor-test",
    protect,
    authorizeRoles("doctor"),
    doctorTest
);

export default router;