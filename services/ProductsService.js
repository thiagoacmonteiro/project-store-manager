const productsModel = require('../models/ProductsModel');

const serviceGetById = async (id) => {
  const [product] = await productsModel.modelGetById(id);

  if (!product) return { code: 404, message: 'Product not found' };

  return product;
};

const serviceCreate = async (name, quantity) => {
  const allProducts = await productsModel.modelGetAll();
  const names = allProducts.map((product) => product.name); 
  const product = await productsModel.modelCreate(name, quantity);

  if (names.includes(product.name)) {
    return { code: 409, message: 'Product already exists' };
  }

  return product;
};

module.exports = {
  serviceGetById,
  serviceCreate,
};
