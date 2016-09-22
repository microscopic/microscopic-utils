'use strict'

const ip = require('ip')

class IP {
  static getIP () {
    return ip.address()
  }
}

module.exports = IP
