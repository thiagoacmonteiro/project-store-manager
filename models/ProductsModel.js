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

module.exports = {
  modelGetAll,
  modelGetById,
};
