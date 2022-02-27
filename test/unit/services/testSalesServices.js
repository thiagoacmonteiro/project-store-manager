const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/SalesModel');
const SalesService = require('../../../services/SalesService');

describe('When call SalesServices.ServiceGetById', () => {

  const modelGetByIdReturn = [
    {
      date: "2022-02-26T22:25:02.000Z",
      productId: 1,
      quantity: 5
    },
    {
      date: "2022-02-26T22:25:02.000Z",
      productId: 2,
      quantity: 10
    }
  ];

  describe('if everything went well returns', async () => {

    before(() => {
      sinon.stub(SalesModel, 'modelGetById').returns(modelGetByIdReturn);
    })

    after(() => {
      SalesModel.modelGetById.restore();
    })

    it('calling ServiceGetById with id 1 will call modelGetById with id 1', async () => {
      await SalesService.serviceGetById(1);

      expect(SalesModel.modelGetById.calledWith(1)).to.be.equal(true);
    })

    it('calling serviceGetById with id 1, modelGetById will return an array of objects', async () => {
      await SalesService.serviceGetById(1);

      expect(SalesModel.modelGetById(1)).to.be.equal(modelGetByIdReturn);
    })
  })
})

describe('When call SalesServices.serviceCreateSale', () => {

  const modelCreateReturn = {
    id: 1,
    itemsSold: [
      {
        productId: 1,
        quantity: 2
      },
      {
        productId: 2,
        quantity: 5
      }
    ]
  };

  const sale = [
    {
      productId: 1,
      quantity: 2
    },
    {
      productId: 2,
      quantity: 5
    }
  ];

  describe('if everything went well returns', async () => {

    before(() => {
      sinon.stub(SalesModel, 'modelCreateSale').returns(modelCreateReturn);
    })

    after(() => {
      SalesModel.modelCreateSale.restore();
    })

    it('calling serviceCreateSale with "sale" will call modelCreateSale with "sale', async () => {
      await SalesService.serviceCreateSale(sale);

      expect(SalesModel.modelCreateSale.calledWith(sale)).to.be.equal(true);
    })

    it('calling serviceCreateSale with "sale", modelCreateSale will return an objects', async () => {
      await SalesService.serviceCreateSale(sale);

      expect(SalesModel.modelCreateSale(sale)).to.be.equal(modelCreateReturn);
    })
  })
})