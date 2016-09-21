'use strict'

const chai = require('chai')
const expect = chai.expect

const Asserts = require('../lib/asserts')

describe('Asserts', () => {
  describe('assert()', () => {
    it('should do nothing', () => {
      Asserts.assert(true)
    })

    it('should throw error with message', () => {
      expect(
        () => Asserts.assert(false, 'Error')
      ).to.throw('Error')
    })

    it('should throw error with default message', () => {
      expect(
        () => Asserts.assert(false)
      ).to.throw('Unknown error')
    })

    it('should throw error', () => {
      expect(
        () => Asserts.assert(false, new TypeError('Type Error'))
      ).to.throw(TypeError, 'Type Error')
    })

    it('should throw error with stringify', () => {
      expect(
        () => Asserts.assert(false, { message: 'TEST' })
      ).to.throw(JSON.stringify({ message: 'TEST' }))
    })
  })
})
