'use strict'

const chai = require('chai')
const expect = chai.expect

const Random = require('../lib/random')

describe('Random', () => {
  describe('uuid()', () => {
    it('should generate unique id', () => {
      const [id1, id2] = [ Random.uuid(), Random.uuid() ]

      expect(id1).to.not.be.equal(id2)
    })
  })
})
