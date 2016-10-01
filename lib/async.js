'use strict'

class Async {
  /**
   * Runs method to each value in the array elements in the series. Callback is called when all tasks are completed.
   *
   * @param {array} array
   * @param {function} method
   * @param {function} callback
   */
  static serial (array, method, callback) {
    if (!Array.isArray(array) || !array.length) {
      return callback()
    }

    let i = 0

    const iterate = () => {
      const next = (error) => {
        if (error) {
          return callback(error)
        }

        if (i >= array.length - 1) {
          return callback()
        }

        i += 1
        return iterate()
      }

      method(array[ i ], next)
    }

    iterate()
  }
}

module.exports = Async
