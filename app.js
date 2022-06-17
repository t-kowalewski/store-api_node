require('dotenv').config();
const express = require('express');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// async errors

const app = express();

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res
    .status(200)
    .send('<h2>Store API</h2><a href="/api/v1/products">Products Route</a>');
});

// products route

// handle 404
app.use(notFound);

// custom error handler
app.use(errorHandler);

// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
