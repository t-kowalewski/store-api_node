// populate DB with provided JSON data

require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    console.log('deleted');

    await Product.create(jsonProducts);
    console.log('added');

    process.exit(0); //terminate running node process
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
