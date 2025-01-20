import express from "express";

const router = express.Router();

// @localhost/api/auth
router.get("/", (req, res) => {
  res.send("Hello, auth route");
});

// @localhost/api/auth/register
router.get("//register", (req, res) => {
  res.send("register route");
});

export default router;
