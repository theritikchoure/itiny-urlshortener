function loggingMiddleware(req, res, next) {
  const start = Date.now();

  // Log request details
  console.log(`Request: ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    // Log response details
    const duration = Date.now() - start;
    console.log(
      `Response: ${res.statusCode} ${res.statusMessage} - ${duration}ms`
    );
  });

  next();
}

module.exports = loggingMiddleware;
