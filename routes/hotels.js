import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE POST @localhost/api/hotels
router.post("/", verifyAdmin, createHotel);

// UPDATE PUT @localhost/api/hotels/:id
router.put("/:id", verifyAdmin, updateHotel);

// DELETE @localhost/api/hotels/:id
router.delete("/:id", verifyAdmin, deleteHotel);

// GET One Hotel GET @localhost/api/hotels/:id
router.get("/:id", getHotel);

// GET ALL Hotels GET @localhost/api/hotels/
router.get("/", getHotels);

export default router;
