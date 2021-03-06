const salesModel = require('../models/SalesModel');
const salesService = require('../services/SalesService');

const controllerGetAll = async (_req, res, next) => {
  try {
    const result = await salesService.serviceGetAll();

    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const controllerGetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.serviceGetById(id);

    if (result.code) return res.status(result.code).json({ message: result.message });

    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const controllerCreate = async (req, res, next) => {
  try {
    const sale = [...req.body];
    const result = await salesService.serviceCreateSale(sale);

    if (result.code) return res.status(result.code).json({ message: result.message });

    return res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const controllerUpdate = async (req, res, next) => {
  try {
    const sale = [...req.body];
    const { id } = req.params;
    const result = await salesModel.modelUpdateSale(sale, id);

    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const controllerDelete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await salesService.serviceDeleteSale(id);

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
