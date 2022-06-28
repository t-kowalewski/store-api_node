const Product = require('../models/product');

const getProducts = async (req, res) => {
  // console.log(req.query);
  const { featured, company, name, sort } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: 'i' };
  }

  let resultQuery = Product.find(queryObj);

  if (sort) {
    resultQuery = resultQuery.sort(sort.split(',').join(' '));
  } else {
    resultQuery = resultQuery.sort('CreatedAt');
  }

  const products = await resultQuery;
  res.status(200).json({ items: products.length, products });
};

module.exports = { getProducts };
