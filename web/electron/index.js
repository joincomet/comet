require('@electron/remote/main').initialize()

const { BrowserWindow, app } = require('electron')
const isDev = require('electron-is-dev')
const contextMenu = require('electron-context-menu')
const { log } = require('./log')
const { setupDiscord } = require('./discord')
const { createLoadingScreen } = require('./loading')
const { runUpdater } = require('./update')
const { createWindow } = require('./mainWindow')

app.setAppUserModelId('Comet')

log.info('App starting...')

contextMenu({ showInspectElement: true }) // TODO disable this

let mainWindow = null

app.whenReady().then(() => {
  const loadingScreen = createLoadingScreen()
  if (!isDev) runUpdater(mainWindow, loadingScreen)
  else mainWindow = createWindow(loadingScreen)

  mainWindow.webContents.on('did-finish-load', () => {
    if (loadingScreen) {
      loadingScreen.close()
    }
    mainWindow.show()
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

setupDiscord(mainWindow)
