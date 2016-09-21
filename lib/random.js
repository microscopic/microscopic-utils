'use strict'

const uuid = require('node-uuid')

class Random {
  /**
   * Generates a v4 (random) uuid.
   *
   * @returns {String}
   */
  static uuid () {
    return uuid.v4()
  }
}

module.exports = Random
