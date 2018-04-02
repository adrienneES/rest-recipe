const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Category} = require('../models/category');
const {Ingredient} = require('../models/ingredient');
const {populateCategories, categories, populateIngredients, ingredients} = require('./seed/seed')

beforeEach(populateIngredients);
beforeEach(populateCategories);
// describe ('ingredients', ()=> {
//     it('should get all ingredients', (done)=> {
//         request(app)
//             .get('/ingredients')
//             .expect(200)
//             .end(done);

//     });
//     it('should return specific ingredient', (done) => {
//         request(app)
//             .get(`/ingredients/${ingredients[0]._id}`)
//             .expect(200)
//             .expect((res)=> {
//                 expect(res.body.ingredient.name).toBe(ingredients[0].name);
//             })
//             .end(done);
//     });
//     it('should return 404 if ingredient is not found', (done)=> {
//         const id = new ObjectID();
//         request(app)
//             .get(`/ingredients/${id}`)
//             .expect(404)
//             .expect((res)=> {
//                 expect(res.body.ingredient).toBe(undefined);
//             })
//             .end(done);
//     })
//     it ('should create a new ingredient', (done)=> {
//         const i = {
//             name: 'new',
//             categoryId: categories[0]._id
//         }
//         request(app)
//             .post('/ingredients')
//             .send(i)
//             .expect(200)
//             .expect((res)=> {
//                 expect(res.body.ingredient.name).toBe('new');
//                 Ingredient.find({})
//                     .then((data)=> {
//                         expect(data.length).toBe(4);
//                     })
//                     .catch((err)=> done(err));
//             })
//             .end(done);
//     });
//     it ('should not create a new ingredient if required data missing', (done)=>{
//         request(app)
//             .post('/ingredients')
//             .send({name:'name'})
//             .expect(400)
//             .expect((res)=> {
//                 Ingredient.find()
//                     .then((data)=> {
//                         expect(data.length).toBe(3);
//                     })
//                     .catch((err)=> {done(err)})
//             })
//             .end(done);
//     });
//     it ('should not create ingredient if category does not exist', (done)=> {
//         request(app)
//             .post('/ingredients')
//             .send({name:'name', categoryId: new ObjectID()})
//             .expect(400)
//             .expect((res)=> {
//                 expect(res.body.message).toBe('categoryId does not exist');
//             })
//             .end(done);
//     })
//     it ('should return all ingedients for specified category', (done)=> {
//         request(app)
//             .get(`/ingredients/category/${categories[0]._id}`)
//             .expect(200)
//             .expect((res)=> {
//                 expect(res.body.ingredients.length).toBe(2);
//             })
//             .end(done);
//     });
//     it('should return 400 if no ingredients in category', (done)=> {
//         request(app)
//             .get(`/ingredients/category/${new ObjectID()}`)
//             .expect(400)
//             .expect((res)=> {
//                 expect(res.body.message).toBe('category not found');
//             })
//             .end(done);
//     });
//     it('should return 400 if invalid categoryId', (done)=> {
//         request(app)
//             .get(`/ingredients/category/a`)
//             .expect(400)
//             .end(done);
//     });
//     describe('delete ingredients', ()=> {
//         it('should delete an ingredient', (done)=> {
//             console.log('deleting id', ingredients[0]._id);
//             request(app)
//                 .delete(`/ingredients/${ingredients[0]._id}`)
//                 .expect(200)
//                 .expect((res)=> {
//                     Ingredient.find()
//                         .then((data)=> {
//                             expect(data.length).toBe(2);
//                         })
//                         .catch((err)=>done(err));
//                 })
//                 .end(done);
//         });
//         it('should not delete an ingredient if not found');
//         it('should return error if bad object id', (done)=> {
//             request(app)
//                 .delete('/ingredients/7')
//                 .expect(400)
//                 .expect((res)=> {
//                     expect(res.body.message).toBe('invalid ingredient id');
//                 })
//                 .end(done);
//         });
//     })
// });
