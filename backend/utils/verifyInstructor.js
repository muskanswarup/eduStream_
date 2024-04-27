import { errorHandler } from "./error.js";

export const verifyInstructor = (req, res, next) => {
  if (req.user && req.user.role === "instructor") {
    next();
  } else {
    return next(errorHandler(403, "You are not authorized to create a course"));
  }
};
