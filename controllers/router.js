const express = require('express');
const ProductValidation = require('../middlewares/ProductValidation');
const productsController = require('./ProductsController');
const salesController = require('./SalesController');

const productsRouter = express.Router({ mergeParams: true });
const salesRouter = express.Router({ mergeParams: true });

productsRouter.get('/', productsController.controllerGetAll);
productsRouter.get('/:id', productsController.controllerGetById);
productsRouter.post('/', ProductValidation, productsController.controllerCreate);

salesRouter.get('/', salesController.controllerGetAll);
salesRouter.get('/:id', salesController.controllerGetById);

module.exports = {
  productsRouter,
  salesRouter,
};
