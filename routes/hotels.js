import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
  getHotelRooms,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// GET ALL Hotels GET @localhost/api/hotels/countByType
router.get("/countByType", countByType);

// GET Hotels CountByCityName @localhost/api/hotels/countByCity?cities=berlin,london,paris
router.get("/countByCity", countByCity);

// GET Hotels CountByType
router.get("/", getHotels);

// CREATE POST @localhost/api/hotels
router.post("/", verifyAdmin, createHotel);

// UPDATE PUT @localhost/api/hotels/:id
router.put("/:id", verifyAdmin, updateHotel);

// DELETE @localhost/api/hotels/:id
router.delete("/:id", verifyAdmin, deleteHotel);

// GET One Hotel GET @localhost/api/hotels/find/:id
router.get("/find/:id", getHotel);

// GET Room/Hotel Details in Modal GET @localhost/api/hotels/room/:hotelId
router.get("/room/:hotelId", getHotelRooms);

export default router;
