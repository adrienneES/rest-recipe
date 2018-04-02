const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
const _ = require ('lodash');
const {mongoose} = require('../config/mongoose');
const {Category} = require('../models/category')
const {Ingredient} = require('../models/ingredient')

const get = (req, res)=> {
    Ingredient.find()
        .then((ingredients)=> {
            res.send({message: `found ${ingredients.length || 0} ingredients`, ingredients});
        })
        .catch((err)=> res.status(400).send({message: 'issue getting data', err}));
}
const post = (req, res)=> {
    const body = _.pick(req.body, ['name', 'categoryId']);
    let ingredient = new Ingredient()
    ingredient.name = body.name;
    ingredient.categoryId = body.categoryId;
    Category.findById(body.categoryId)
        .then((category)=> {
            if (!category) {
                return res.status(400).send({message: 'categoryId does not exist'})
            }
            ingredient.save()
            .then((ingredient)=> {
                res.send({message: 'returned data', ingredient});
            })
            })
            .catch((err)=> {res.status(400).send({message: 'issue saving ingredient', err})});
}
const getById = (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({message: `bad id: ${id}`});
    }
    Ingredient.findById(id)
        .then((ingredient)=>{
            if (!ingredient) {
                return res.status(404).send({message: `ingredient: ${id} not found`});
            }
            res.send({message: 'found data', ingredient});
        })
        .catch((err)=> {
            res.status(400).send({message:`error sending ingredient: ${id}`, err});
        })
}
const getCategoryIngredients = (req, res) => {
    const id = req.params.categoryId;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({message: `bad category id ${id}`});
    }
    Category.findById(id)
        .then((category)=> {
            if(!category) {
                return res.status(400).send({message: `category not found`})
            }
            Ingredient.find({categoryId: ObjectID(id)})
            .then((ingredients)=> {
                res.send({message: `found ${ingredients.length} ingredients for ${id}`, ingredients});
            })
        })
        .catch((err) => { res.status(400).send({message: `error looking up categories for ${id}`, err})});
}
const patch = (req, res)=> {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({message: 'invalid object id'});
    }
}
const remove = (req, res)=> {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({message: 'invalid ingredient id'});
    }
    Ingredient.findByIdAndRemove(id)
        .then((ingredient)=> {

        })
}
module.exports = {
    get,
    post,
    getById,
    getCategoryIngredients,
    patch,
    remove
}
