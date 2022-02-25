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

const serviceCreateSale = async (sale) => {
  const inventory = await salesModel.modelGetProductIdAndQty();
  const excessiveAmount = [];
  sale.forEach((product) => {
    inventory.forEach((item) => {
      if (item.id === product.productId && item.quantity < product.quantity) {
        excessiveAmount.push(item);
      }
    });  
  });

  if (excessiveAmount.length > 0) {
    return { code: 422, message: 'Such amount is not permitted to sell' };
  }

  const result = await salesModel.modelCreateSale(sale);

  return result;
};

module.exports = {
  serviceGetById,
  serviceDeleteSale,
  serviceCreateSale,
};
