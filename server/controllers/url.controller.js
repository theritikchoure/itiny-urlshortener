const URL = require("../models/urls.model");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const redisClient = require("../config/redis");

// Custom function to generate short IDs
function generateShortId(length = 7) {
  return crypto
    .randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, length);
}


module.exports = { shortenUrl, getOriginalUrl };

// Controller to shorten a URL
async function shortenUrl(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let err = errors.array();
    return res.status(400).json({ errors: err[0].msg });
  }

  const { originalUrl } = req.body;
  const shortUrl = generateShortId();

  try {
    // Check if the short URL already exists in MongoDB
    const existingUrl = await URL.findOne({ shortUrl });
    if (existingUrl) {
      return res.status(400).json({ message: "Short URL already exists." });
    }

    let url = new URL({
      originalUrl,
      shortUrl,
    });

    await url.save();

    await redisClient.setEx(shortUrl, 3600, originalUrl); // Store the original URL in Redis

    res.status(201).json({ shortUrl });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Controller to redirect to the original URL
async function getOriginalUrl(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let err = errors.array();
    return res.status(400).json({ errors: err[0].msg });
  }
  const { shortUrl } = req.params;
  try {
    // Try to get the URL from Redis cache
    const cachedUrl = await redisClient.get(shortUrl);
    if (cachedUrl) {
      return res.status(201).json({ originalUrl: cachedUrl });
    }

    const url = await URL.findOne({ shortUrl: shortUrl });

    if (url) {
      // Cache the result for future requests
      await redisClient.setEx(shortUrl, 3600, url.originalUrl);
      res.status(201).json({ originalUrl: url.originalUrl });
    } else {
      res.status(404).json({ message: "Shortened URL not found" });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
