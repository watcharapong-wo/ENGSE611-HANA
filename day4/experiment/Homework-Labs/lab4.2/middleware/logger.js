// middleware/logger.js
module.exports = (req, res, next) => {
  const time = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  console.log(`[${time}] ${method} ${url} - from ${ip}`);
  next();
};
