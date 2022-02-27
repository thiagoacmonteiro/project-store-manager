const salesModel = require('../models/SalesModel');

const serializeGetAll = (salesData) => {
  const data = {
    saleId: salesData.sale_id,
    date: salesData.date,
    productId: salesData.product_id,
    quantity: salesData.quantity,
  };
  
  return data;
};

const serializeGetById = (salesData) => {
  const data = {
    date: salesData.date,
    productId: salesData.product_id,
    quantity: salesData.quantity,
  };
  
  return data;
};

const serviceGetAll = async () => {
  const sales = await salesModel.modelGetAll();

  const serializedSales = sales.map((sale) => serializeGetAll(sale));

  return serializedSales;
};

const serviceGetById = async (id) => {
  const sale = await salesModel.modelGetById(id);

  if (!sale.length) return { code: 404, message: 'Sale not found' };

  const serializedSale = sale.map((item) => serializeGetById(item));

  return serializedSale;
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
  serviceGetAll,
  serializeGetById,
};
