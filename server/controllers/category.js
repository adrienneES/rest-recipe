const {ObjectID} = require('mongodb');
const _ = require ('lodash');
const {mongoose} = require('../config/mongoose');
const {Category} = require('../models/category')
const {Ingredient} = require('../models/ingredient')

const get = (req, res)=> {
    Category.find()
        .then((categories)=> {
            res.send({message: `found ${categories.length || 0} categories`, categories});
        })
        .catch((err)=> res.status(400).send({message: 'issue getting data', err}));
}
const post = (req, res)=> {
    const body = _.pick(req.body, ['name']);
    const category = new Category({'name': body.name});
    category.save()
        .then(()=> {
            res.send({message: 'data saved', category});
        })
        .catch((err)=> { res.status(400).send({message: 'issue', err})});
};
const getById = (req, res)=> {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({message: `bad id ${id}` });
    }
    Category.findById(id)
        .then((category) => {
            if (!category) {
                return res.status(404).send({message: `category ${id} not found`});                
            }
            res.send({message: `found ${id}`, category});
        })
        .catch((err)=> {
            res.status(400).send({message: `issue sending ${id}`, err});
        })
};

const patch = (req, res)=> {
    const id = req.params.id;
    const body = _.pick(req.body, ['name']);
    if(!ObjectID.isValid(id)) {
        return res.status(400).send({message: 'bad category id'})
    }
    Category.findByIdAndUpdate(id, {$set:body}, {new: true})
        .then((category)=> {
            if (!category){
                return res.status(404).send({message: `category not found`});
            }
            res.send({message: `category${id} updated`, category});
        })
        .catch((err)=> {
            res.status(400).send({message:`issue updating ${id}`, err});
        })
}
const remove = (req, res) => {
    const id = req.params.id;
    Ingredient.find({categoryId:id})
        .then((data)=> {
            if (data.length) {
                return res.status(400).send({message: 'cannot delete; ingredients found'});
            }
            Category.findByIdAndRemove(id)
            .then((data)=> {
                if (!data) {
                    return res.status(404).send({message: 'category not found'});
                }
                res.send({message:`deleted category ${id}`});
            })
            .catch((err)=> {
                res.status(400).send({message: 'issue deleting', err});
            })
        })
    }
module.exports = {
    get,
    post,
    getById,
    patch,
    remove
}