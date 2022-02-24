const productsModel = require('../models/ProductsModel');

const serviceGetById = async (id) => {
  const [product] = await productsModel.modelGetById(id);

  if (!product) return { code: 404, message: 'Product not found' };

  return product;
};

module.exports = {
  serviceGetById,
};
