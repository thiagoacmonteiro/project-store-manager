const salesModel = require('../models/SalesModel');

const serviceGetById = async (id) => {
  const sale = await salesModel.modelGetById(id);

  if (!sale.length) return { code: 404, message: 'Sale not found' };

  return sale;
};

module.exports = {
  serviceGetById,
};
