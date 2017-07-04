import chai from 'chai'
import chaiHttp from 'chai-http'
import options from '../server'

const { db, server } = options

chai.use(chaiHttp)

var expect = chai.expect

describe('models', function () {
  before(function (done) {
    db.query('TRUNCATE TABLE models', function (err) {
      if (err) return done(err)
      done()
    })
  })

  beforeEach(function (done) {
    db.query('INSERT INTO models SET ?', {name: 'test', attribute: 1}, function (err) {
      if (err) return done(err)
      done()
    })
  })

  afterEach(function (done) {
    db.query('TRUNCATE TABLE models', function (err) {
      if (err) return done(err)
      done()
    })
  })

  /*eslint-disable */

  it('should get all models at /api/models GET', function (done) {
    chai.request(server)
    .get('/api/models')
    .end(function (err, res) {
      var body = res.body.body[0]

      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.have.status('success')
      expect(body).to.have.property('id')
      expect(body).to.have.property('name')
      expect(body).to.have.property('attribute')
      done()
    })
  })

  it('should create a model at /api/models POST', function (done) {
    chai.request(server)
    .post('/api/models')
    .send({ name: 'test2', attribute: 2})
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.have.status('success')
      done()
    })
  })

  it('should get a single model at /api/models/:id GET', function (done) {
    chai.request(server)
    .get('/api/models')
    .end(function (error, response) {
      expect(error).to.be.null
      expect(response).to.have.status(200)
      expect(response).to.be.json
      expect(response.body).to.have.status('success')
      chai.request(server)
      .get('/api/models/' + response.body.body[0].id)
      .end(function (err, res) {
        var body = res.body.body[0]

        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.status('success')
        expect(body).to.have.property('id')
        expect(body).to.have.property('name')
        expect(body).to.have.property('attribute')
        done()
      })
    })
  })

  it('should update a single model at /api/models/:id', function (done) {
    chai.request(server)
    .get('/api/models')
    .end(function (error, response) {
      expect(error).to.be.null
      expect(response).to.have.status(200)
      expect(response).to.be.json
      expect(response.body).to.have.status('success')

      chai.request(server)
      .put('/api/models/' + response.body.body[0].id)
      .send({name: 'newName', attribute: 42})
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.status('success')
        done()
      })
    })
  })

  it('should remove a model at /api/models/:id DELETE', function (done) {
    chai.request(server)
    .get('/api/models')
    .end(function (error, response) {
      expect(error).to.be.null
      expect(response).to.have.status(200)
      expect(response).to.be.json
      expect(response.body).to.have.status('success')

      chai.request(server)
      .delete('/api/models/' + response.body.body[0].id)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.status('success')
        done()
      })
    })
  })
})
