import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// REGISTER @http://localhost:8800/api/auth/register
router.post("/register", register);

//LoGIN @http://localhost:8800/api/auth/login
router.post("/login", login);

export default router;
