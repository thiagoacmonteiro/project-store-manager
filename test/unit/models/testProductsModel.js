const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');

const ProductsModel = require('../../../models/ProductsModel');

const products = [
  {
    id: 1,
    name: "produto A",
    quantity: 10
  },
  {
    id: 2,
    name: "produto B",
    quantity: 20
  }
];

describe('List all products', () => {

  before(() => {
    sinon.stub(connection, 'execute').resolves([products]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('returns an array', async () => {
    const products = await ProductsModel.modelGetAll();

    expect(products).to.be.an('array');
  })

  it('returns an array of objects containing properties', async () => {
    const products = await ProductsModel.modelGetAll();

    products.forEach((product) => {
      expect(product).to.have.keys('id', 'name', 'quantity');
    })
  })
})