const {ObjectID} = require('mongodb');
const {Category} = require('../../models/category');
const {Ingredient} = require('../../models/ingredient');

const categoryOneId = new ObjectID();
const categoryTwoId = new ObjectID();
const fruitOneId = new ObjectID();
const fruitTwoId = new ObjectID();
const fruitThreeId = new ObjectID();
const categories = [{
        _id: categoryOneId,
        name: 'fruit'
    },
    {
        _id: categoryTwoId,
        name: 'seafood'
    },
    {
        _id: new ObjectID(),
        name: 'spices'
    }
]

const ingredients = [{
    _id: fruitOneId,
    name: 'banana',
    categoryId: categoryOneId
},{
    _id: fruitTwoId,
    name: 'apple',
    categoryId: categoryOneId
}, {
    _id: fruitThreeId,
    name: 'cod', 
    categoryId: categoryTwoId
}];

const populateIngredients = (done)=> {
    Ingredient.remove({})
        .then(()=> {
            return Ingredient.insertMany(ingredients)
        })
        .then(()=> done())
        .catch((err)=> done(err));
}

const populateCategories = (done)=> {
    Category.remove({})
        .then(()=> {
            return Category.insertMany(categories);
        })
        .then (()=> done());
}

module.exports = {populateCategories, categories, populateIngredients, ingredients}