require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
const myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};
app.use(myLogger);
app.get('/', (req, res)=> {
    res.send('main');
})
app.get('/categories', (req, res)=> {
    res.send('categories');
})
app.listen(port, () => {
    console.log(`started on port ${port}`);
});
module.exports = {app}; // for supertest