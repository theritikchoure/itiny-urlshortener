const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();
const URL = require("../models/urls.model");
const crypto = require("crypto");
const redisClient = require("../config/redis"); // Import the Redis client
const urlController = require('../controllers/url.controller');
const { urlShortenRateLimiter } = require("../middlewares/rate-limit.middleware");

// Custom function to generate short IDs
function generateShortId(length = 8) {
  return crypto
    .randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, length);
}

// Route to shorten a URL
router.post(
  "/shorten",
  urlShortenRateLimiter,
  [
    body("originalUrl")
      .isURL({ require_protocol: true, require_tld: true })
      .withMessage("Original url is empty or in invalid format")
      .trim(),
  ],
  urlController.shortenUrl
);

// Route to redirect to the original URL
router.get(
  "/:shortUrl",
  [
    param("shortUrl")
      .isLength({ min: 1 })
      .withMessage("Short URL code is required")
      .trim()
      .escape(),
  ],
  urlController.getOriginalUrl
);

module.exports = router;
