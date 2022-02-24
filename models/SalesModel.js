const connection = require('./connection');

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

const modelGetAll = async () => {
  const query = (
    `SELECT sale_id, date, product_id, quantity FROM sales
    INNER JOIN sales_products ON sale_id = id
    ORDER BY sale_id AND product_id;`
  );
  const [sales] = await connection.execute(query);

  const serializedSales = sales.map((sale) => serializeGetAll(sale));

  return serializedSales;
};

const modelGetById = async (id) => {
  const query = (
    `SELECT date, product_id, quantity FROM sales
    INNER JOIN sales_products ON sale_id = id
    WHERE sale_id =?;`
  );
  const [sales] = await connection.execute(query, [id]);

  const serializedSales = sales.map((sale) => serializeGetById(sale));

  return serializedSales;
};

module.exports = {
  modelGetAll,
  modelGetById,
};
