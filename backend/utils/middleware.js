import logger from "./logger.js";

const firstMiddleware = (req, res, next) => {
  logger.info("I am in the first middlware");
  logger.info("---");
  logger.info("Method: ", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

const middleware = { errorHandlerMiddleware, firstMiddleware };

export default middleware;
