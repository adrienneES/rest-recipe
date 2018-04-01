const _ = require ('lodash');
require('./config/config');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./config/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();
const port = process.env.PORT;
const {Category} = require('./models/category')
app.use(bodyParser.json());
const myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};
app.use(myLogger);
app.get('/', (req, res)=> {
    const env = process.env;
    res.send({message: 'main', env});
})
app.get('/categories', (req, res)=> {
    Category.find()
        .then((categories)=> {
            res.send({message: 'got data', categories});
        })
        .catch((err)=> {message: 'issue getting data', err});
})
app.post('/categories', (req, res)=> {
    const body = _.pick(req.body, ['name']);
    const category = new Category({'name': body.name});
    category.save()
        .then(()=> {
            res.send({message: 'data saved', category});
        })
        .catch((err)=> { res.send({message: 'issue', err})});
});
app.get('/categories/:id', (req, res)=> {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({message: `bad id ${id}` });
    }
    Category.findById(id)
        .then((category) => {
            if (!category) {
                res.status(404).send({message: `category ${id} not found`});                
            }
            res.send({message: `found ${id}`, category});
        })
        .catch((err)=> {
            res.status(400).send({message: `issue sending ${id}`, err});
        })
})
app.listen(port, () => {
    console.log(`started on port ${port}`);
});
module.exports = {app}; // for supertest