const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/ProductsModel');
const ProductsService = require('../../../services/ProductsService');

describe('When call ProductsServices.ServiceGetById', () => {

  const modelGetByIdReturn = [ { id: 1, name: 'Martelo de Thor', quantity: 10 } ];

  describe('if everything went well returns', async () => {

    before(() => {
      sinon.stub(ProductsModel, 'modelGetById').returns(modelGetByIdReturn);
    })

    after(() => {
      ProductsModel.modelGetById.restore();
    })

    it('calling ServiceGetById with id 1 will call modelGetById with id 1', async () => {
      await ProductsService.serviceGetById(1);

      expect(ProductsModel.modelGetById.calledWith(1)).to.be.equal(true);
    })

    it('calling serviceGetById with id 1, modelGetById will return an array of objects', async () => {
      await ProductsService.serviceGetById(1);

      expect(ProductsModel.modelGetById(1)).to.be.equal(modelGetByIdReturn);
    })
  })
})
