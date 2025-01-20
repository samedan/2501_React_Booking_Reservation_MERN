import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Register POST @http://localhost:8800/api/auth/register
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("User created succesfully");
  } catch (err) {
    next(err);
  }
};
