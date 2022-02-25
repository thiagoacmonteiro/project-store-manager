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

const subtractProductQtyWhenCreateSale = (sale, saleQuery, saleInsert) => {
  const updateProductQuery = 'UPDATE products SET quantity = ? WHERE id = ?;';
  const productQuery = 'SELECT quantity FROM products WHERE id = ?;';

  sale.forEach(async (product) => {
    await connection.execute(saleQuery, [saleInsert.insertId, product.productId, product.quantity]);
    const [productQuantity] = await connection.execute(productQuery, [product.productId]);
    const { quantity } = productQuantity[0];
    await connection
      .execute(updateProductQuery, [(quantity - product.quantity), product.productId]);
  });
};

const modelCreateSale = async (sale) => {
  const [saleInsert] = await connection.execute('INSERT INTO sales (date) VALUES (now());');
  const saleQuery = (
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);'
  );  
  
  subtractProductQtyWhenCreateSale(sale, saleQuery, saleInsert);

  const productArray = sale
    .map((product) => ({ productId: product.productId, quantity: product.quantity }));

  return {
    id: saleInsert.insertId,
    itemsSold: productArray,
  };
};

const modelGetProductIdAndQty = async () => {
  const qtyQuery = 'SELECT id, quantity FROM products;';
 
  const [result] = await connection.execute(qtyQuery);

  return result;
};

const modelUpdateSale = async (sale, id) => {
  await connection.execute(
    'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?;',
    [sale[0].productId, sale[0].quantity, id],
  );

  return {
    saleId: id,
    itemUpdated: [
      {
        productId: sale[0].productId,
        quantity: sale[0].quantity,
      },
    ],
  };
};

const modelDeleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?;', [id],
  );

  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?;', [id],
  );
};

const modelGetSalesIds = async () => {
  const ids = await connection.execute('SELECT id FROM sales;');

  return ids;
};

module.exports = {
  modelGetAll,
  modelGetById,
  modelCreateSale,
  modelUpdateSale,
  modelDeleteSale,
  modelGetSalesIds,
  modelGetProductIdAndQty,
};
