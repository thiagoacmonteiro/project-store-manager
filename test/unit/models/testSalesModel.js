const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModel');

const sales = [
  {
    sale_id: 1,
    date: "2022-02-26T23:28:13.000Z",
    product_id: 1,
    quantity: 5
  },
  {
    sale_id: 1,
    date: "2022-02-26T23:28:13.000Z",
    product_id: 2,
    quantity: 10
  },
  {
    sale_id: 2,
    date: "2022-02-26T23:28:13.000Z",
    product_id: 3,
    quantity: 15
  }
]

const serializedSale = {
  saleId: sales.sale_id,
  date: sales.date,
  productId: sales.product_id,
  quantity: sales.quantity,
}

const serializedSales = [
  {
    saleId: 1,
    date: "2022-02-26T23:28:13.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: "2022-02-26T23:28:13.000Z",
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: "2022-02-26T23:28:13.000Z",
    productId: 3,
    quantity: 15
  }
]

const products = [
  {
    "productId": 1,
    "quantity": 2
  }
]

const affectedRows = { affectedRows: 1 };

describe('Test SalesModel layer', () => {
  describe('when SalesModel.getAll is called', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([sales]);
      sinon.stub(SalesModel, 'serializeGetAll').resolves(serializedSale);
    });

    after(() => {
      connection.execute.restore();
      SalesModel.serializeGetAll.restore();
    });

    it('check the return', async () => {
      const result = await SalesModel.modelGetAll();
      
      // expect(result).to.be.an('array');
      expect(result).to.be.equal(serializedSales);
    });
  });

  describe('2- testando salesModels.readById', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([[serializedSales[0]], []]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('verifica se a função readById tem o retorno esperado', async () => {
      const result = await SalesModel.modelGetById();

      expect(result).to.be.an('array');
      expect(result[0]).to.be.equal(serializedSales[0]);
    });
  });

  describe('3- testando salesModels.update', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[affectedRows], []]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('verifica se a função update tem o retorno esperado', async () => {
      const result = await SalesModel.modelUpdateSale(1, products);
      expect(result).to.be.an('object');
    });
  });
});