'use strict'

const chai = require('chai')
const expect = chai.expect

const Async = require('../lib/async')

describe('Async', () => {
  describe('serial', () => {
    it('should call callback immediately if was passed empty array or not array', (done) => {
      Async.serial({}, (method, next) => method(next), ()=> {
        done()
      })
    })

    it('should run all method in correct order', (done) => {
      const result = []

      const methods = [
        (next) => {
          result.push(1)
          next()
        },
        (next) => {
          result.push(2)
          next()
        },
        (next) => {
          result.push(3)
          next()
        },
        (next) => {
          result.push(4)
          next()
        },
        (next) => {
          result.push(5)
          next()
        }
      ]

      Async.serial(methods, (method, next) => method(next), () => {
        for (let i = 0; i < result.length; i++) {
          expect(result[ i ]).to.be.equal(i + 1)
        }

        done()
      })
    })

    it('should call callback with error if there is an error in step', (done) => {
      const error = new Error('test')

      const result = []

      const methods = [
        (next) => {
          result.push(1)
          next()
        },
        (next) => {
          result.push(2)
          next()
        },
        (next) => {
          result.push(3)
          next(error)
        },
        (next) => {
          result.push(4)
          next()
        },
        (next) => {
          result.push(5)
          next()
        }
      ]

      Async.serial(methods, (method, next) => method(next), (err) => {
        expect(err).to.be.equal(error)

        for (let i = 0; i < 3; i++) {
          expect(result[ i ]).to.be.equal(i + 1)
        }

        done()
      })
    })
  })
})
