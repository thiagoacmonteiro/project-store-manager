const productsService = require('../services/ProductsService');

const controllerGetAll = async (_req, res, next) => {
  try {
    const result = await productsService.serviceGetAll();

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

const controllerCreate = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await productsService.serviceCreate(name, quantity);

    if (result.code) return res.status(result.code).json({ message: result.message });

    return res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const controllerUpdate = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const result = await productsService.serviceUpdate(name, quantity, id);

    if (result.code) return res.status(result.code).json({ message: result.message });

    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const controllerDelete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await productsService.serviceDelete(id);

    if (result.code === 404) return res.status(result.code).json({ message: result.message });

    return res.status(result.code).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  controllerGetAll,
  controllerGetById,
  controllerCreate,
  controllerUpdate,
  controllerDelete,
};
