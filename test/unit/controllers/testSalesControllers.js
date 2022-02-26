const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/SalesModel');
const SalesService = require('../../../services/SalesService');
const SalesController = require('../../../controllers/SalesController');

describe('When call SalesController.controllerGetAll', () => {

  const modelGetAllReturn = [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ];
  
  let request = {}, response = {}, next = () => {};

  describe('if everything went well returns', async () => {

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesModel, 'modelGetAll').returns(modelGetAllReturn);
    })

    after(() => {
      SalesModel.modelGetAll.restore();
    })

    it('res.status is called with status 200', async () => {
      await SalesController.controllerGetAll(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('res.json is called passing an array of objects', async () => {
      await SalesController.controllerGetAll(request, response, next);

      expect(response.json.calledWith(modelGetAllReturn)).to.be.equal(true);
    })
  })

  describe('if something goes wrong', async () => {

    const err = Error('Model error');

    before(() => {
      next = sinon.stub().returns();
      sinon.stub(SalesModel, 'modelGetAll').throws(err);  
    })

    after(() => {
      SalesModel.modelGetAll.restore();
    })

    it('SalesModel throws an error', async () => {
      await SalesController.controllerGetAll(request, response, next);

      expect(next.calledWith(sinon.match(err))).to.be.equal(true);
    })
  })
})

describe('When call SalesController.ControllerGetById', () => {

  const serviceGetByIdReturn = [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ];
  
  let request = {}, response = {}, next = () => {};

  describe('if everything went well returns', async () => {

    before(() => {
      request.params = sinon.stub().returns({ id: 1 }); 
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()    
      sinon.stub(SalesService, 'serviceGetById').returns(serviceGetByIdReturn);
    })

    after(() => {
      SalesService.serviceGetById.restore();
    })

    it('res.status is called with status 200', async () => {
      await SalesController.controllerGetById(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('res.json is called passing an array of objects', async () => {
      await SalesController.controllerGetById(request, response, next);

      expect(response.json.calledWith(serviceGetByIdReturn)).to.be.equal(true);
    })
  })

  describe('if something goes wrong', async () => {

    const err = Error('Service error');

    before(() => {
      sinon.stub(SalesService, 'serviceGetById').throws(err);
      next = sinon.stub().returns(); 
    })

    after(() => {
      SalesService.serviceGetById.restore();
    })

    it('SalesService throws an error', async () => {
      await SalesController.controllerGetById(request, response, next);

      expect(next.calledWith(sinon.match(err))).to.be.equal(true);
    })
  })
})
