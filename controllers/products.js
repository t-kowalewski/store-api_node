const getProducts = async (req, res) => {
  res.status(200).json({ msg: 'products testing list' });
};

module.exports = { getProducts };
