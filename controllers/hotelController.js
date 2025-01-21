import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// CREATE POST @localhost/api/hotels
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

// UPDATE PUT @localhost/api/hotels/:id
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// GET ALL Hotels GET @localhost/api/hotels
export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

// GET One Hotel GET @localhost/api/hotels/find/:i
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// GET Count Hotels By CITY GET @localhost/api/hotels/countByCity?cities=berlin,london,paris
export const countByCity = async (req, res, next) => {
  // create ["city1","city2"] from ?cities=city1,city2
  console.log(req.query.cities);
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        console.log(city.toLowerCase());
        // countDocuments comes from mongoDb
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

// DELETE @localhost/api/hotels/:id
export const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (hotel) {
      await hotel.findByIdAndDelete(req.params.id);
      res.status(200).json("Hotel has been deleted");
    } else {
      return next(createError(404, "no hotel found"));
    }
  } catch (err) {
    next(err);
  }
};
