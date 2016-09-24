'use strict'

class Retry {
  /**
   * Retry operation if failed.
   *
   * @param {object} options
   * @param {number} [options.retries=0] - Maximum number of attempts
   * @param {number|function} [options.timeout=0] - Time to wait between attempts or function `(attempt) => attempt * 10s`
   * @param {function} operation - Operation function `(callback) => {}`
   * @param {function} [callback]
   * @return {Promise|void}
   */
  static retry (options, operation, callback = null) {
    if (!callback) {
      return new Promise((resolve, reject) => {
        runAttempt(1, resolve, reject)
      })
    }

    runAttempt(1, (result) => callback(null, result), (error) => callback(error))

    function runAttempt (attempt, resolve, reject) {
      operation((error, result) => {
        if (error) {
          if (attempt >= options.retries || 0) {
            return reject(error)
          }

          let timeout = 0

          if (options.timeout) {
            timeout = typeof options.timeout === 'function' ? options.timeout(attempt) : options.timeout
          }

          return setTimeout(() => runAttempt(attempt + 1, resolve, reject), timeout)
        }

        return resolve(result)
      })
    }
  }
}

module.exports = Retry
