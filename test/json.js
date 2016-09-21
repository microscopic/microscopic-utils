'use strict'

const chai = require('chai')
const expect = chai.expect

const JsonUtils = require('../lib/json')

describe('Json', () => {
  describe('stringify()', () => {
    it('should return null if error occurs', () => {
      const obj = {}
      obj.a = { b: obj }

      expect(JsonUtils.stringify(obj)).to.be.null
    })
  })

  describe('parse()', () => {
    it('should parse string to object', () => {
      const obj = { a: 1, b: 2, c: 3 }
      const string = JSON.stringify(obj)

      expect(JsonUtils.parse(string)).to.be.deep.equal(obj)
    })

    it('should parse buffer to object', () => {
      const obj = { a: 1, b: 2, c: 3 }
      const string = JSON.stringify(obj)
      const buffer = new Buffer(string)

      expect(JsonUtils.parse(buffer)).to.be.deep.equal(obj)
    })

    it('should return null if error occurs', () => {
      const string = '{a:1'

      expect(JsonUtils.parse(string)).to.be.null
    })
  })
})
