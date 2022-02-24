const express = require('express');
const ProductValidation = require('../middlewares/ProductValidation');
const SaleValidation = require('../middlewares/SalesValidation');
const productsController = require('./ProductsController');
const salesController = require('./SalesController');

const productsRouter = express.Router({ mergeParams: true });
const salesRouter = express.Router({ mergeParams: true });

productsRouter.get('/', productsController.controllerGetAll);
productsRouter.get('/:id', productsController.controllerGetById);
productsRouter.post('/', ProductValidation, productsController.controllerCreate);
productsRouter.put('/:id', ProductValidation, productsController.controllerUpdate);
productsRouter.delete('/:id', productsController.controllerDelete);

salesRouter.get('/', salesController.controllerGetAll);
salesRouter.get('/:id', salesController.controllerGetById);
salesRouter.post('/', SaleValidation, salesController.controllerCreate);
salesRouter.put('/:id', SaleValidation, salesController.controllerUpdate);
salesRouter.delete('/:id', salesController.controllerDelete);

module.exports = {
  productsRouter,
  salesRouter,
};
