import express from "express";

const router = express.Router();

// @localhost/auth
router.get("/api", (req, res) => {
  res.send("Hello, auth route");
});

// @localhost/auth/register
router.get("/api/register", (req, res) => {
  res.send("register route");
});

export default router;
