import jwt from "jsonwebtoken";
import { createError } from "./error.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   console.log(req.cookies);
//   console.log(req.cookies.access_token);
//   if (!token) {
//     console.log("no token");
//     return next(createError(401, "You are not authenticated"));
//   }
//   // check if token is correct
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return next(createError(403, "Token is not valid"));
//     }
//     req.user = user;
//     next();
//   });
// };

// VERIFY TOKEN
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

// VERIFY USER
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

// VERIFY ADMIN
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};
