'use strict'

class Json {
  /**
   * Converts object to string or to null if during conversion error occurred.
   *
   * @param {Object} obj
   * @returns {String|Null}
   */
  static stringify (obj) {
    try {
      return JSON.stringify(obj)
    } catch (error) {
      return null
    }
  }

  /**
   * Converts string or Buffer to object or to null if during conversion error occurred.
   *
   * @param {String|Buffer} stringOrBuffer
   * @returns {Object|Null}
   */
  static parse (stringOrBuffer) {
    try {
      return JSON.parse(Buffer.isBuffer(stringOrBuffer) ? stringOrBuffer.toString('utf8') : stringOrBuffer)
    } catch (error) {
      return null
    }
  }
}

module.exports = Json
