const rateLimit = require("express-rate-limit");

// Currently uses an in-memory store until we need to move it into
// its own store with perhaps Redis
// LIMIT: 50 requests per 60 minutes
const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message:
    "Too many queries created from this IP address, please try again after an hour"
});

module.exports = { rateLimiter };
