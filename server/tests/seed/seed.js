const {ObjectID} = require('mongodb');
const {Category} = require('../../models/category');

const categoryOneId = new ObjectID();
const categoryTwoId = new ObjectID();

const categories = [{
        _id: categoryOneId,
        name: 'fruit'
    },
    {
        _id: categoryTwoId,
        name: 'seafood'
    }
]

const populateCategories = (done)=> {
    Category.remove({})
        .then(()=> {
            return Category.insertMany(categories);
        })
        .then (()=> done());
}

module.exports = {populateCategories, categories}