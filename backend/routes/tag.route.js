import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { verifyInstructor } from "../utils/verifyInstructor.js";
import { createTag, getTags } from "../controllers/tag.controller.js";

const tagRouter = express.Router();

tagRouter.post("/create_tag/:id", verifyToken, verifyInstructor, createTag);
tagRouter.get("/get_tags", verifyToken, getTags);

export { tagRouter }