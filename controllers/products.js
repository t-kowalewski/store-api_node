const getProducts = async (req, res) => {
  // throw new Error('testing async errors');
  res.status(200).json({ msg: 'products testing list' });
};

module.exports = { getProducts };
