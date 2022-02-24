const productsModel = require('../models/ProductsModel');
const productsService = require('../services/ProductsService');

const controllerGetAll = async (_req, res, next) => {
  try {
    const result = await productsModel.modelGetAll();

    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const controllerGetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsService.serviceGetById(id);

    if (result.code) return res.status(result.code).json({ message: result.message });

    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  controllerGetAll,
  controllerGetById,
};
