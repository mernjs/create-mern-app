const DEFAULT_OPTIONS = {
  limit: 60,
  windowMs: 60000
};

function rateLimit(options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const store = new Map();

  return function rateLimitMiddleware(req, res, next) {
    const key = req.ip;
    const now = Date.now();

    const entry = store.get(key) || {
      count: 0,
      resetTime: now + config.windowMs
    };

    if (now > entry.resetTime) {
      entry.count = 0;
      entry.resetTime = now + config.windowMs;
    }

    entry.count += 1;
    store.set(key, entry);

    if (entry.count > config.limit) {
      res.status(429).json({
        error: "Rate limit exceeded",
        retryAfter: Math.ceil((entry.resetTime - now) / 1000)
      });
      return;
    }

    next();
  };
}

module.exports = rateLimit;
