require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();

// middleware
app.use(express.json());

// home route
app.get('/', (req, res) => {
  res
    .status(200)
    .send('<h2>Store API</h2><a href="/api/v1/products">Products Route</a>');
});

// products route
app.use('/api/v1/products', productsRouter);

// handle 404
app.use(notFound);

// custom error handler
app.use(errorHandler);

// Start server/app
const port = process.env.PORT || 3000;

const startApp = () => {
  connectDB(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to DB');

      app.listen(port, () => {
        console.log(`server is listening on port ${port}...`);
      });
    })
    .catch((err) => {
      console.log("Can't connect to DB: ", err);
    });
};

startApp();
