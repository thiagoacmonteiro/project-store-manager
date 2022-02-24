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

const serviceUpdate = async (name, quantity, id) => {
  const allProducts = await productsModel.modelGetAll();
  const ids = allProducts.map((product) => product.id);
  const product = await productsModel.modelUpdate(name, quantity, id);

  console.log(ids);
  console.log(product.id);
  if (!ids.includes(Number(product.id))) {
    return { code: 404, message: 'Product not found' };
  }

  return product;
};

module.exports = {
  serviceGetById,
  serviceCreate,
  serviceUpdate,
};