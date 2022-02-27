const sinon = require('sinon');
const { expect } = require('chai');

const ProductsController = require('../../../controllers/ProductsController');
const { productsRouter } = require('../../../controllers/router');

describe('When a route is called', () => {

  before(() => {
    sinon.stub(productsRouter, 'get').returns();
  });

  describe('If the route is /product', () => { 
    
    it('and the method is get', () => {
      productsRouter.get('/', ProductsController.getAllProducts);
      expect(productsRouter.get.calledWith('/', ProductsController.getAllProducts));
    });
   });
});