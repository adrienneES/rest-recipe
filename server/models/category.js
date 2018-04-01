const mongoose = require('mongoose');
const Category = mongoose.model('Category', {
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
});

module.exports = {Category}