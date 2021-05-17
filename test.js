//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
const { describe } = require('mocha');
let server = require('./server.js')
let should = chai.should();
chai.use(chaiHttp);
describe('Random number endpoints', function () {


describe('randomNum', () => {
    it('Should get a random number between 1 and 1024', (done) => {
        chai.request(server)
        .get('/api/random')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.number.should.be.a('number')
            done()
            //console.log(res.body)
        })

    })
})
describe('customRandomNum', () => {
    it('Should get a random number between 1 and input of the user', (done) => {
        chai.request(server)
        .get('/api/custom_random/200')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.number.should.be.a('number')
            done()
            //console.log(res.body)
        })

    })
})
})
describe('Counter endpoints', function () {
describe('counter', () => {
    it('Should get the current value of the counter', (done) => {
        chai.request(server)
        .get('/api/counter')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.number.should.be.a('number')
            done()
            //console.log(res.body)
        })

    })
})

describe('addToCounter', () => {
    it('Should add one to the counter', (done) => {
        chai.request(server)
        .get('/api/counter/add')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.number.should.be.a('number')
            done()
            //console.log(res.body)
        })

    })
})

//*Fanns inte innan
describe('addTwoToCounter', () => {
    it('Should add two to the counter', (done) => {
        chai.request(server)
        .get('/api/counter/addTwo')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.number.should.be.a('number')
            done()
            //console.log(res.body)
        })
    })
})


//*Fanns inte innan
describe('doubleCounter', () => {
    it('Should double the current counter', (done) => {
        chai.request(server)
        .get('/api/counter/double')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.number.should.be.a('number')
            done()
            //console.log(res.body)
        })
    })
})
});