import express from "express";
import { register } from "../controllers/authController.js";

const router = express.Router();

// @http://localhost:8800/api/auth/register
router.post("/register", register);

export default router;
