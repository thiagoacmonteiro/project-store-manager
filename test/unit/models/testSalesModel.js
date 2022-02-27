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

const sale = [
  {
    productId: 1,
    quantity: 2
  }
]

const affectedRows = { affectedRows: 1 };

describe('Test SalesModel layer', () => {
  describe('when SalesModel.getAll is called', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([sales]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('check the return', async () => {
      const result = await SalesModel.modelGetAll();
      
      expect(result).to.be.an('array');
      expect(result).to.be.equal(sales);
    });
  });

  describe('When salesModels.modelGetById is called', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([[sales[0]], []]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('check the return', async () => {
      const result = await SalesModel.modelGetById();

      expect(result).to.be.an('array');
      expect(result[0]).to.be.equal(sales[0]);
    });
  });

  describe('When salesModels.modelCreateSale is called', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[affectedRows], []]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('check the return', async () => {
      const result = await SalesModel.modelCreateSale(sale);
      expect(result).to.be.an('object');
    });
  });


  describe('When salesModels.modelUpdateSale is called', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[affectedRows], []]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('check the return', async () => {
      const result = await SalesModel.modelUpdateSale(sale, 1);
      expect(result).to.be.an('object');
    });
  });
});