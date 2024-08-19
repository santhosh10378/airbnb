export const errorHandlerMiddleware = (err, req, res, next) => {
  const errorMessage = err.message || "Internal Server Error";
  const errorStatus = err.statusCode || 500;

  console.log(err);
  res.status(errorStatus).json({ message: errorMessage });
};
