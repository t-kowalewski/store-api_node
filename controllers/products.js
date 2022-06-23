const Product = require('../models/product');

const getProducts = async (req, res) => {
  // console.log(req.query);
  const products = await Product.find(req.query);
  res.status(200).json({ items: products.length, products });
};

module.exports = { getProducts };
