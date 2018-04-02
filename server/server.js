require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();
const port = process.env.PORT;
const categoryRouter = require('./routes/categoryRouter')();
const ingredientRouter = require('./routes/ingredientRouter')();
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
app.use('/categories', categoryRouter);
app.use('/ingredients', ingredientRouter);
app.listen(port, () => {
    console.log(`started on port ${port}`);
});
module.exports = {app}; // for supertest