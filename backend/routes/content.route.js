import express from "express";
import {
  addContent,
  deleteContent,
  watchedContent,
} from "../controllers/content.controller.js";
import { verifyInstructor } from "../utils/verifyInstructor.js";
import { verifyToken } from "../utils/verifyToken.js";
import { verifyEnduser } from "../utils/verifyEnduser.js";

const contentRouter = express.Router();

contentRouter.post(
  "/add_content/:id",
  verifyToken,
  verifyInstructor,
  addContent
);
contentRouter.put(
  "/watched_content/:id",
  verifyToken,
  verifyEnduser,
  watchedContent
);
contentRouter.delete(
  "/delete_content/:id",
  verifyToken,
  deleteContent
);

export { contentRouter };
