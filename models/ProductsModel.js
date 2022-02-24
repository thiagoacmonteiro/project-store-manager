const connection = require('./connection');

const modelGetAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id;');

  return products;
};

const modelGetById = async (id) => {
  const query = 'SELECT * FROM products WHERE id=?;';
  const [product] = await connection.execute(query, [id]);

  return product;
};

const modelCreate = async (name, quantity) => {
  const [createdProduct] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?);', [name, quantity],
  );

  return {
    id: createdProduct.insertId,
    name,
    quantity,
  };
};

const modelUpdate = async (name, quantity, id) => {
  const updatedProduct = await connection.execute(
    'UPDATE products SET name = ?, quantity= ? WHERE id = ?;', [name, quantity, id],
  );

  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  modelGetAll,
  modelGetById,
  modelCreate,
  modelUpdate,
};
