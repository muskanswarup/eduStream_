import mongoose from "mongoose";
import config from "../utils/config.js";
import logger from "../utils/logger.js";

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info("Connected to database!");
  })
  .catch((err) => {
    logger.error(err);
  });
