const express = require ('express');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../config/mongoose');
const categoryController = require('../controllers/category');
const routes = ()=> {
    const categoryRouter = express.Router();
    categoryRouter.get('/', categoryController.get);
    categoryRouter.post('/', categoryController.post);
    categoryRouter.get('/:id', categoryController.getById);
    categoryRouter.patch('/:id', categoryController.patch);
    categoryRouter.delete('/:id', categoryController.remove);
    return categoryRouter
}
module.exports = routes;
