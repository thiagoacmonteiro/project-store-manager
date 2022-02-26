const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');

const ProductsModel = require('../../../models/ProductsModel');

describe('List all products', () => {

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