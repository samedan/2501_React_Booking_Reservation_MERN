import express from "express";
import {
  createRoom,
  deleteRoom,
  getRooms,
  getRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE POST @localhost/api/rooms/:hotelId
router.post("/:hotelId", verifyAdmin, createRoom);

// UPDATE PUT @localhost/api/rooms/availability/:roomId
router.put("/availability/:roomId", updateRoomAvailability);

// UPDATE PUT @localhost/api/rooms/:id
router.put("/:id", verifyAdmin, updateRoom);

// DELETE @localhost/api/rooms/:roomId/:hotelId
router.delete("/:roomId/:hotelId", verifyAdmin, deleteRoom);

// GET One Room GET @localhost/api/rooms/:id
router.get("/:id", getRoom);

// GET ALL Rooms GET @localhost/api/rooms/
router.get("/", getRooms);

export default router;
