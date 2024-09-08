const redis = require("redis");

// Create a Redis client
const client = redis.createClient({
  url: "redis://localhost:6379", // Replace with your Redis server URL and port
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

client.on("connect", (err) => {
  console.error("Redis Client Connected");
});

client.connect();

module.exports = client;
