import express from "express";

import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// CHeck Token GET @@localhost/api/users/checkauthentication
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user, you are logged in");
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
