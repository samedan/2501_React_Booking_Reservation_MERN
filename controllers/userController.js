import User from "../models/User.js";
import { createError } from "../utils/error.js";

// UPDATE PUT @localhost/api/users/:id
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// GET ALL Users GET @localhost/api/users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

// GET One User GET @localhost/api/users/:i
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// DELETE @localhost/api/users/:id
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } else {
      return next(createError(404, "no user found"));
    }
  } catch (err) {
    next(err);
  }
};
