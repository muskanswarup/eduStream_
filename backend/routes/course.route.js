import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { verifyInstructor } from "../utils/verifyInstructor.js";
import {
  completeCourse,
  createCourse,
  deleteCourse,
  enrollCourse,
  getAllCourses,
  getCourse,
  getMyCourses,
} from "../controllers/course.controller.js";
import { verifyEnduser } from "../utils/verifyEnduser.js";

const courseRouter = express.Router();

courseRouter.get("/get_courses", verifyToken, getAllCourses);
courseRouter.get("/get_my_courses", verifyToken, getMyCourses);
courseRouter.post(
  "/create_course",
  verifyToken,
  verifyInstructor,
  createCourse
);
courseRouter.get("/get_course/:id", verifyToken, getCourse);
courseRouter.put(
  "/enroll_course/:id",
  verifyToken,
  verifyEnduser,
  enrollCourse
);
courseRouter.put(
  "/complete_course/:id",
  verifyToken,
  completeCourse
);
courseRouter.delete(
  "/delete_course/:id",
  verifyToken,
  verifyInstructor,
  deleteCourse
);

export { courseRouter };
