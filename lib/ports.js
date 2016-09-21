'use strict'

const net = require('net')

class Ports {
  /**
   * Returns free random port.
   *
   * @returns {Promise.<Number>}
   */
  static getFreePort () {
    return new Promise((resolve, reject) => {
      const server = net.createServer()

      server.unref()
      server.on('error', reject)

      server.listen(0, function () {
        const port = server.address().port

        server.close(function () {
          resolve(port)
        })
      })
    })
  }
}

module.exports = Ports
