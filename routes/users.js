import express from "express";

import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Check Token GET @localhost/api/users/checkauthentication
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user, you are logged in");
});

// Check Token GET @localhost/api/users/checkuser/:id
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("hello User id, you are logged in and can delete your account");
});

// Check Token GET @localhost/api/users/checkadmin/:id
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("hello Admin, you are logged in and can delete ALL Accounts");
});

// UPDATE PUT @localhost/api/users/:id
router.put("/:id", updateUser);

// DELETE @localhost/api/users/:id
router.delete("/:id", deleteUser);

// GET One User GET @localhost/api/users/:id
router.get("/:id", getUser);

// GET ALL Users GET @localhost/api/users/
router.get("/", getUsers);

export default router;
