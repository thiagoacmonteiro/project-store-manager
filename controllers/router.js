const express = require('express');
const productsController = require('./ProductsController');
const salesController = require('./SalesController');

const productsRouter = express.Router({ mergeParams: true });
const salesRouter = express.Router({ mergeParams: true });

productsRouter.get('/', productsController.controllerGetAll);
productsRouter.get('/:id', productsController.controllerGetById);
salesRouter.get('/', salesController.controllerGetAll);
salesRouter.get('/:id', salesController.controllerGetById);

module.exports = {
  productsRouter,
  salesRouter,
};
