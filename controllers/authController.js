import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

// Login POST @http://localhost:8800/api/auth/login
export const login = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return next(createError(303, "Missing credentials"));
  }

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(404, "Wrong password or username"));
    // only display some user data (not password)
    // create TOKEN
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    // COOKIE
    // res
    //   .cookie("acces_token", token, {
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json({ ...otherDetails });

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
