const { autoUpdater } = require('electron-updater')
const ProgressBar = require('electron-progressbar')
const { log } = require('./log')
const { app } = require('electron')
const { createWindow } = require('./mainWindow')

module.exports = {
  runUpdater: mainWindow => {
    autoUpdater.logger = log
    autoUpdater.logger.transports.file.level = 'info'
    autoUpdater.autoDownload = false

    // Check for updates every minute
    setInterval(() => {
      autoUpdater.checkForUpdates()
    }, 1000 * 60)

    let progressBar

    autoUpdater.on('checking-for-update', () => {
      log.info('Checking for update...')
    })

    autoUpdater.on('update-available', info => {
      log.info('Update available.')
      log.info(info)

      if (mainWindow) {
        // Show icon in main app
        mainWindow.send('updateAvailable')
        return
      }

      autoUpdater.downloadUpdate()

      progressBar = new ProgressBar({
        indeterminate: false,
        title: 'Update in progress',
        text: 'Preparing to download updates.',
        detail: 'Downloading...',
        browserWindow: {
          webPreferences: {
            nodeIntegration: true
          }
        }
      })

      progressBar
        .on('completed', function () {
          progressBar.detail = 'Download completed.'
        })
        .on('aborted', function (value) {
          log.error('Download aborted.')
          app.quit()
        })
        .on('progress', function (value) {
          progressBar.text = 'Downloading updates.'
          progressBar.detail = `Downloading... ${value}%`
        })
    })

    autoUpdater.on('update-not-available', info => {
      log.info('Update not available.')
      log.info(info)
      mainWindow = createWindow()
    })

    autoUpdater.on('error', err => {
      log.error('Error in auto-updater. ' + err)
    })

    autoUpdater.on('download-progress', progressObj => {
      let logMessage = 'Download speed: ' + progressObj.bytesPerSecond
      logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%'
      logMessage =
        logMessage +
        ' (' +
        progressObj.transferred +
        '/' +
        progressObj.total +
        ')'
      log.info(logMessage)
      progressBar.value = parseInt(progressObj.percent)
    })

    autoUpdater.on('update-downloaded', info => {
      log.info('Update downloaded')
      log.info(info)
      setImmediate(() => autoUpdater.quitAndInstall())
    })
  }
}
