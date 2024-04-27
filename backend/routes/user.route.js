import express from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";
import { verifyInstructor } from "../utils/verifyInstructor.js";
import { verifyToken } from "../utils/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/get_user/:id", verifyToken, verifyInstructor, getUser);
userRouter.get("/get_all_users", verifyToken, verifyInstructor, getAllUsers);

export { userRouter };
