const salesModel = require('../models/SalesModel');

const serviceGetById = async (id) => {
  const sale = await salesModel.modelGetById(id);

  if (!sale.length) return { code: 404, message: 'Sale not found' };

  return sale;
};

const serviceDeleteSale = async (id) => {
  const [result] = await salesModel.modelGetSalesIds();
  const ids = result.map((data) => data.id);

  if (!ids.includes(Number(id))) {
    return { code: 404, message: 'Sale not found' };
  }

  await salesModel.modelDeleteSale(id);

  return { code: 204 };
};

module.exports = {
  serviceGetById,
  serviceDeleteSale,
};
