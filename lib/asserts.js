'use strict'

const JsonUtils = require('./json')

class Asserts {
  /**
   * Checks condition. If the result of condition is false throwing error.
   *
   * @param condition
   * @param {String|Error|Object} msg
   */
  static assert (condition, msg = 'Unknown error') {
    if (condition) {
      return
    }

    if (typeof msg === 'string') {
      throw new Error(msg)
    }

    if (msg instanceof Error) {
      throw msg
    }

    throw new Error(JsonUtils.stringify(msg))
  }
}

module.exports = Asserts
