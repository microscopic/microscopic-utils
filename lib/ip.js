'use strict'

const ip = require('ip')

class IP {
  /**
   * Returns current public IP.
   *
   * @return {string}
   */
  static getIP () {
    return ip.address()
  }
}

module.exports = IP
