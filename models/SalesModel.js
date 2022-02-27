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

const subtractProductQtyWhenCreateSale = async (sale, saleQuery, saleInsert) => {
  const updateProductQuery = 'UPDATE products SET quantity = ? WHERE id = ?;';
  const productQuery = 'SELECT quantity FROM products WHERE id = ?;';

  const result = sale.map(async (product) => {
    await connection.execute(saleQuery, [saleInsert.insertId, product.productId, product.quantity]);
    const [productQuantity] = await connection.execute(productQuery, [product.productId]);
    const { quantity } = productQuantity[0];
    await connection
      .execute(updateProductQuery, [(quantity - product.quantity), product.productId]);
  });

  await Promise.all(result);
};

const modelCreateSale = async (sale) => {
  const [saleInsert] = await connection.execute('INSERT INTO sales (date) VALUES (now());');
  const saleQuery = (
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);'
  );  
  
  await subtractProductQtyWhenCreateSale(sale, saleQuery, saleInsert);

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

const addProductQtyWhenDeleteSale = async (id) => {
  const productQuery = 'SELECT quantity FROM products WHERE id = ?;';
  const updateProductQuery = 'UPDATE products SET quantity = ? WHERE id = ?;';
  const sumProductQtys = (
    `SELECT product_id, SUM(quantity) AS quantity FROM sales_products WHERE sale_id = ?
    GROUP BY product_id;`
  );

  const [quantitySold] = await connection.execute(sumProductQtys, [id]);
  
  const salesData = quantitySold.map(async (item) => {
    const [quantity] = await connection.execute(productQuery, [item.product_id]);
    await connection
      .execute(
        updateProductQuery, [(quantity[0].quantity + Number(item.quantity)), item.product_id],
      );
  });

  await Promise.all(salesData);
};

const modelDeleteSale = async (id) => {
  await addProductQtyWhenDeleteSale(id)
    .then(() => connection.execute(
      'DELETE FROM sales WHERE id = ?;', [id],
    )
    .then(() => connection.execute(
      'DELETE FROM sales_products WHERE sale_id = ?;', [id],
    )));
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
  serializeGetAll,
};
