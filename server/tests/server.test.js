const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Category} = require('../models/category');
const {Ingredient} = require('../models/ingredient');
const {populateCategories, categories, populateIngredients, ingredients} = require('./seed/seed')

beforeEach(populateIngredients);
beforeEach(populateCategories);
describe('root tests', ()=> {
    it('should return root', (done)=> {
        request(app)
            .get('/')
            .expect(200)
            .expect((res)=> {
                expect(res.body.message).toBe('main');
            })
            .end(done);
    })
});

describe ('category', () => {
    it('should get all categories', (done) => {
        request(app)
            .get('/categories')
            .expect(200)
            .expect((res)=> {
                expect(res.body.categories.length).toBe(3);
            })
            .end(done);
    });
    it ('should return a given category', (done) => {
        request(app)
            .get(`/categories/${categories[0]._id}`)
            .expect(200)
            .expect((res)=> {
                expect(res.body.category.name).toBe(categories[0].name);
            })
            .end(done);
    })
    it('should return 404 for a random object id', (done)=> {
        const id = new ObjectID;
        request(app)
            .get(`/categories/${id}`)
            .expect(404)
            .end(done);
    })
    it('should post a category with good data', (done)=> {
        request(app)
            .post('/categories')
            .send({name:'meat'})
            .expect(200)
            .expect((res)=> {
                expect(res.body.category.name).toBe('meat');
                Category.find({})
                    .then((data)=> {
                        expect(data.length).toBe(4);
                    })
                    .catch((err)=> done(err));
            })
            .end(done);
    });
    it('should not post with bad data', (done)=> {
        request(app)
            .post('/categories')
            .send({})
            .expect(400)
            .expect((res)=> {
                Category.find({})
                    .then((data)=> {
                        expect(data.length).toBe(3);
                    })
                    .catch((err)=> done(err));
            })
            .end(done);
    });
    it('should not post a duplicate category', (done)=> {
        request(app)
            .post('/categories')
            .send({name:'fruit'})
            .expect(400)
            .expect((res)=> {
                expect(res.body.message).toBe('issue')
                Category.find({})
                    .then((data)=> {
                        expect(data.length).toBe(3);
                    })
                    .catch((err)=> done(err));
            })
            .end(done);
    });
    it('should update a category', (done)=> {
        request(app)
            .patch(`/categories/${categories[0]._id}`)
            .send({name:'hi'})
            .expect(200)
            .expect((res)=> {
                Category.findById(categories[0]._id)
                    .then((category)=> {
                        expect(category.name).toBe('hi');
                    })
                    .catch((err)=>done(err))
            })
            .end(done);
    });
    it('should return 404 if category to update is not found', (done)=>{
        request(app)
            .patch(`/categories/${new ObjectID()}`)
            .send({name:'hi'})
            .expect(404)
            .end(done);
    });
    it('should return 400 if category id is bad', (done)=> {
        request(app)
            .patch(`/categories/7`)
            .send({name:'hi'})
            .expect(400)
            .expect((res)=> {
                expect(res.body.message).toBe('bad category id');
            })
            .end(done);
        
    });
    it('should delete a valid category only if there are no ingredients', (done)=> {
        request(app)
            .delete(`/categories/${categories[2]._id}`)
            .expect(200)
            .expect((res)=> {
                Category.find()
                    .then((categories)=> {
                        expect(categories.length).toBe(2);
                    })
                    .catch((err)=>done(err));
            })
            .end(done);
    });
    it('should not delete a valid category if there are ingredients', (done)=> {
        request(app)
            .delete(`/categories/${categories[0]._id}`)
            .expect(400)
            .expect((res)=> {
                Category.find()
                    .then((categories)=> {
                        expect(categories.length).toBe(3);
                        expect(res.body.message).toBe('cannot delete; ingredients found');
                    })
                    .catch((err)=>done(err));
            })
            .end(done);
    });
it('should not delete an invalid category', (done)=> {
            request(app)
                .delete(`/categories/${new ObjectID()}`)
                .expect(404)
                .expect((res)=> {
                    Category.find()
                        .then((categories)=> {
                            expect(categories.length).toBe(3);
                        })
                        .catch((err)=>done(err));
                })
                .end(done);
        });
})

