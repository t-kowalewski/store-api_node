const Product = require('../models/product');

const getProducts = async (req, res) => {
  // console.log(req.query);
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '<': '$lt',
      '>=': '$gte',
      '<=': '$lte',
      '=': '$eq',
    };

    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    console.log(numericFilters);
    console.log(filters);
  }

  let resultQuery = Product.find(queryObj);

  if (sort) {
    resultQuery = resultQuery.sort(sort.split(',').join(' '));
  } else {
    resultQuery = resultQuery.sort('CreatedAt');
  }

  if (fields) {
    resultQuery = resultQuery.select(fields.split(','));
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  resultQuery = resultQuery.skip(skip).limit(limit);

  const products = await resultQuery;
  res.status(200).json({ items: products.length, products });
};

module.exports = { getProducts };
