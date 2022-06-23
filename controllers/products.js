const Product = require('../models/product');

const getProducts = async (req, res) => {
  // console.log(req.query);
  const { featured } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === 'true' ? true : false;
  }

  const products = await Product.find(queryObj);
  res.status(200).json({ items: products.length, products });
};

module.exports = { getProducts };
