process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let truck = require('../model/Foodtruck');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('foodtrucks', () => {
    beforeEach((done) => { //Before each test we empty the database
        truck.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
  describe('/GET truck', () => {
      it('it should GET all the trucks', (done) => {
        chai.request(server)
            .get('/foodtruck')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/POST truck', () => {
     it('it should not POST a truck without avgcost and coordinates', (done) => {
       let truck = {
           name: "Robs sea of food",
           foodtype: "seafood",
           avgost: 10.5,
           geometry: [29, 130]
       }
       chai.request(server)
           .post('/foodtruck')
           .send(truck)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('errors');
               res.body.errors.should.have.property('pages');
               res.body.errors.pages.should.have.property('kind').eql('required');
             done();
           });
     });

 });

});
