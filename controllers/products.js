const Product = require('../models/product');

const getProducts = async (req, res) => {
  // console.log(req.query);
  const { featured, company, name, sort } = req.query;
  const queryObj = {};
  let sortStr = '';

  if (featured) {
    queryObj.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: 'i' };
  }

  if (sort) {
    sortStr = sort.split(',').join(' ');
  }

  const products = await Product.find(queryObj).sort(sortStr);
  res.status(200).json({ items: products.length, products });
};

module.exports = { getProducts };
