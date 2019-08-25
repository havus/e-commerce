const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const User = require('../../server/models/user');
chai.use(chaiHttp);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDYwYzRkNTBlZDEyYzI5ODQ1MTI4NWMiLCJmdWxsbmFtZSI6IkpvaG4gRG9lIiwidXNlcm5hbWUiOiJqb2huZG9ldyIsImVtYWlsIjoiam9objJAbWFpbC5jb20iLCJpYXQiOjE1NjY2MjM4MzR9.IclDAE6pAffzTjfKYrUHToe7DQT3k2kqCuua4ne6fbs'

describe('User', function() {
  
  // describe('POST /user/signup', function() {
  //   it('should be return token if username & password & email valid', function(done) {
  //     let obj = {
  //       // fullname: "John Doe",
  //       // username: "johndoew",
  //       email: "john2@mail.com",
  //       password: "johndoe",
  //     }

  //     chai.request('http://localhost:3000')
  //       .post('/user/signup')
  //       .send(obj)
  //       .end(function(err, res) {
  //         expect(res).to.have.status(201);
  //         expect(res.body).to.have.property('token');
  //         done();
  //       })
  //   })
  // })

  describe('POST /user/signin', function() {
    it('should be return token if username & password & email valid', function(done) {
      let obj = {
        email: "john2@mail.com",
        password: "johndoe",
      }

      chai.request('http://localhost:3000')
        .post('/user/signin')
        .send(obj)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        })
    })
  })

})

describe('Product', function() {
  describe('POST /product', function() {
    it('should be return _id, name, stock, price, img_url, createdAt, updatedAt', function(done) {
      const obj = {
        name: 'hape',
        stock: 9,
        // price: 100000,
        img_url: 'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'
      }
      
      chai.request('http://localhost:3000')
      .post('/product')
      .set('token', token)
      .send(obj)
      .end(function(err, res) {
        if (!obj.name || !obj.stock || !obj.price || !obj.img_url) {
          expect(res).to.have.status(400);
        } else {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('stock');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('img_url');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt');
        }
        done();
      })
    })
  })
})