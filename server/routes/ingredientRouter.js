const express = require ('express');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../config/mongoose');
const ingredientController = require('../controllers/ingredients');
const routes = ()=> {
    const ingredientRouter = express.Router();
    ingredientRouter.get('/', ingredientController.get);
    ingredientRouter.post('/', ingredientController.post);
    ingredientRouter.get('/:id', ingredientController.getById);
    ingredientRouter.patch('/:id', ingredientController.patch);
    ingredientRouter.delete('/:id', ingredientController.remove);
    ingredientRouter.get('/category/:categoryId', ingredientController.getCategoryIngredients);
    return ingredientRouter;
}
module.exports = routes;
