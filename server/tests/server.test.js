const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Category} = require('../models/category');
const {populateCategories, categories} = require('./seed/seed')

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
                expect(res.body.categories.length).toBe(2);
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
    it('should return 404 for a random object id')
})
