'use strict'

const chai = require('chai')
const expect = chai.expect

const Retry = require('../lib/retry')

describe('Retry', () => {
  describe('retry()', () => {
    it('should return promise', () => {
      expect(Retry.retry({}, (callback) => callback(null, 1))).to.be.instanceOf(Promise)
    })

    it('should retry operation', () => {
      let attempt = 0

      return Retry.retry({ retries: 5 }, (callback) => {
        attempt++
        callback(new Error())
      }).catch(() => {
        expect(attempt).to.be.equal(5)
      })
    })

    it('should return result', () => {
      let attempt = 0

      return Retry.retry({ retries: 5 }, (callback) => {
        attempt++

        if (attempt === 4) {
          return callback(null, attempt)
        }

        callback(new Error())
      }).then((result) => {
        expect(result).to.be.equal(attempt)
      })
    })

    it('should wait X time between attempts', () => {
      const startedAt = Date.now()

      return Retry.retry({ retries: 5, timeout: 20 }, (callback) => {
        callback(new Error())
      }).catch(() => {
        expect(Date.now() - 80).to.be.above(startedAt)
      })
    })

    it('should wait X (generated) time between attempts', () => {
      const startedAt = Date.now()

      return Retry.retry({ retries: 5, timeout: (attempt) => attempt * 10 }, (callback) => {
        callback(new Error())
      }).catch(() => {
        expect(Date.now() - 100).to.be.above(startedAt)
      })
    })

    it('should return result using callback', (done) => {
      Retry.retry({ retries: 5 }, (callback) => { callback(null, 1) }, (error, result) => {
        expect(error).to.be.null
        expect(result).to.be.equal(1)
        done()
      })
    })

    it('should return error using callback', (done) => {
      Retry.retry({ retries: 5 }, (callback) => { callback(new Error('TEST')) },
        (error) => {
          expect(error.message).to.be.equal('TEST')
          done()
        })
    })
  })
})
