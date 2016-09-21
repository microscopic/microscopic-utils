'use strict'

const chai = require('chai')
const expect = chai.expect

const Ports = require('../lib/ports')

describe('Ports', () => {
  describe('getFreePort()', () => {
    it('should return number', () => {
      Ports.getFreePort()
        .then((port) => {
          expect(port).to.be.a('number')
        })
    })

    it('should return random free port', () => {
      const ports = Promise.all([ Ports.getFreePort(), Ports.getFreePort() ])
      ports.then((port1, port2) => {
        expect(port1).to.not.be(port2)
      })
    })
  })
})
