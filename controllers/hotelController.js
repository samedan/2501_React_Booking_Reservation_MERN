import Hotel from "../models/Hotel.js";

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

// GET One Hotel GET @localhost/api/hotels/:i
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
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
      res.status(401).json("no hotel found");
    }
  } catch (err) {
    next(err);
  }
};
