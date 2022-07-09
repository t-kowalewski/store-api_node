const Product = require('../models/product');

const getProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObj = {};

  // Search logic (based on filter)
  if (featured) {
    queryObj.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: 'i' };
  }

  // Numeric filters logic
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

    const options = ['price', 'rating'];

    filters = filters.split(',');

    filters.forEach((item) => {
      const [field, operator, value] = item.split('-');

      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  let resultQuery = Product.find(queryObj);

  // Sort logic
  if (sort) {
    resultQuery = resultQuery.sort(sort.split(',').join(' '));
  } else {
    resultQuery = resultQuery.sort('createdAt');
  }

  // Select logic
  if (fields) {
    resultQuery = resultQuery.select(fields.split(','));
  }

  // Limit & skipping logic for output (pages)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  resultQuery = resultQuery.skip(skip).limit(limit);

  const products = await resultQuery;
  res.status(200).json({ items: products.length, products });
};

module.exports = { getProducts };
