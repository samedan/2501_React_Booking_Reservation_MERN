import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// POSt room @localhost/api/rooms/:hotelId
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    // update hotel with new Room
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// UPDATE PUT @localhost/api/rooms/:id
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// GET ALL Rooms GET @localhost/api/rooms
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

// GET One Room GET @localhost/api/rooms/:i
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// DELETE @localhost/api/rooms/:roomId/:hotelId
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.roomId);
    // update hotel with deleted Room
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.roomId },
      });
      res.status(200).json("Room has been deleted");
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
