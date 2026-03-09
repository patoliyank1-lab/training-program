import { styleText } from 'node:util';
function errorHandler (err, req, res, next) {
  console.error(styleText(['red', 'bold'] ,err.message));  // highlight error by bold red color
  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? 'Something went wrong!';


  // send error response
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
};


const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
  next();
};

export {errorHandler, requestLogger};
