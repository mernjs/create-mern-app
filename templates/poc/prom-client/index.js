const express = require('express');
const Prometheus = require('prom-client');

const app = express();
const PORT = 3000;

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in milliseconds',
  labelNames: ['method', 'route', 'status'],
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
      .observe(duration);
  });
  next();
});

app.get('/', (req, res) => {
  try {
    res.status(200).send('Hello, Prometheus!');
  } catch (error) {
    res.status(500).send('Hello, Prometheus!');
  }
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType);
  try {
    const metrics = await Prometheus.register.metrics();
    res.end(metrics);
  } catch (err) {
    console.error('Error getting metrics:', err);
    res.status(500).end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
