import { errorHandler } from "./error.js";

export const verifyEnduser = (req, res, next) => {
  if (req.user && req.user.role === "enduser") {
    next();
  } else {
    return next(errorHandler(403, "You cannot enroll in a course or watch a content"));
  }
};
