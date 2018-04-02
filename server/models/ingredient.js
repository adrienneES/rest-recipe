const mongoose = require('mongoose');
const Category = require('./category');
const Ingredient = mongoose.model('Ingredient', {
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        required:true,
    } 
});

module.exports = {Ingredient}