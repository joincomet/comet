const log = require('electron-log')
const isDev = require('electron-is-dev')
const { join } = require('path')

if (!isDev) {
  log.transports.file.resolvePath = variables => {
    return join(variables.electronDefaultDir, variables.fileName)
  }
}

module.exports = { log }
