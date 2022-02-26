const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/ProductsModel');
const ProductsService = require('../../../services/ProductsService');
const ProductsController = require('../../../controllers/ProductsController');

describe('When call ProductsController.ControllerGetAll', () => {

  const modelGetAllReturn = [
    {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "produto B",
      "quantity": 20
    }
  ];
  
  let request = {}, response = {}, next = () => {};

  describe('if everything went well returns', async () => {

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsModel, 'modelGetAll').returns(modelGetAllReturn);
    })

    after(() => {
      ProductsModel.modelGetAll.restore();
    })

    it('res.status is called with status 200', async () => {
      await ProductsController.controllerGetAll(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('res.json is called passing an array of objects', async () => {
      await ProductsController.controllerGetAll(request, response, next);

      expect(response.json.calledWith(modelGetAllReturn)).to.be.equal(true);
    })
  })

  describe('if something goes wrong', async () => {

    const err = Error('Model error');

    before(() => {
      next = sinon.stub().returns();
      sinon.stub(ProductsModel, 'modelGetAll').throws(err);  
    })

    after(() => {
      ProductsModel.modelGetAll.restore();
    })

    it('ProductsModel throws an error', async () => {
      await ProductsController.controllerGetAll(request, response, next);

      expect(next.calledWith(sinon.match(err))).to.be.equal(true);
    })
  })
})

describe('When call ProductsController.ControllerGetById', () => {

  const serviceGetByIdReturn = { id: 1, name: 'Martelo de Thor', quantity: 10 };
  
  let request = {}, response = {}, next = () => {};

  describe('if everything went well returns', async () => {

    before(() => {
      request.params = sinon.stub().returns({ id: 1 }); 
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()    
      sinon.stub(ProductsService, 'serviceGetById').returns(serviceGetByIdReturn);
    })

    after(() => {
      ProductsService.serviceGetById.restore();
    })

    it('res.status is called with status 200', async () => {
      await ProductsController.controllerGetById(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('res.json is called passing an object', async () => {
      await ProductsController.controllerGetById(request, response, next);

      expect(response.json.calledWith(serviceGetByIdReturn)).to.be.equal(true);
    })
  })

  describe('if something goes wrong', async () => {

    const err = Error('Service error');

    before(() => {
      sinon.stub(ProductsService, 'serviceGetById').throws(err);
      next = sinon.stub().returns(); 
    })

    after(() => {
      ProductsService.serviceGetById.restore();
    })

    it('ProductsService throws an error', async () => {
      await ProductsController.controllerGetById(request, response, next);

      expect(next.calledWith(sinon.match(err))).to.be.equal(true);
    })
  })
})
