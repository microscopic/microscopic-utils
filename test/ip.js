'use strict'

const chai = require('chai')
const expect = chai.expect

const IP = require('../lib/ip')

describe('IP', () => {
  describe('getIP()', () => {
    it('should return ip', () => {
      const ip = IP.getIP()

      expect(ip).to.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)
    })
  })
})
