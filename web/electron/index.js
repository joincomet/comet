require('@electron/remote/main').initialize()

const { join } = require('path')
const { BrowserWindow, app, Tray, Menu } = require('electron')
const isDev = require('electron-is-dev')
const contextMenu = require('electron-context-menu')
const { log } = require('./log')
const { createLoadingScreen } = require('./loading')
const { runUpdater } = require('./update')
const { createWindow } = require('./mainWindow')
const DiscordRPC = require('discord-rpc')

app.setAppUserModelId('Comet')

log.info('App starting...')

contextMenu({ showInspectElement: true }) // TODO disable this

let mainWindow = null
let loadingScreen = null
let tray = null

app.whenReady().then(() => {
  loadingScreen = createLoadingScreen()
  if (!isDev) runUpdater(mainWindow, loadingScreen)
  else {
    mainWindow = createWindow(loadingScreen)
    mainWindow.webContents.on('did-finish-load', () => {
      if (loadingScreen) {
        loadingScreen.hide()
      }
      mainWindow.show()
      mainWindow.send('windowOpened')
    })
  }

  app.on('activate', function () {
    mainWindow.send('windowOpened')
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Comet',
      click: function () {
        mainWindow.show()
        mainWindow.send('windowOpened')
      }
    },
    {
      label: 'Quit',
      click: function () {
        mainWindow.destroy()
        app.quit()
      }
    }
  ])

  tray = new Tray(join(__dirname, './resources/tray.png'))
  tray.setToolTip('Comet')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => mainWindow.show())
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

const clientId = '829047983378792518'

// Only needed if you want to use spectate, join, or ask to join
// DiscordRPC.register(clientId)

const rpc = new DiscordRPC.Client({ transport: 'ipc' })

async function setActivity() {
  if (!rpc || !mainWindow) {
    return
  }

  // You'll need to have snek_large and snek_small assets uploaded to
  // https://discord.com/developers/applications/<application_id>/rich-presence/assets
  rpc.setActivity({
    details: `Chat and forums for communities.`,
    state: 'joincomet.app',
    largeImageKey: 'discord_rich_presence_icon',
    largeImageText: 'Drop Discord and Reddit, join Comet',
    instance: false
  })
}

rpc.on('ready', () => {
  setActivity()

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity()
  }, 15e3)
})

rpc.login({ clientId }).catch(console.error)
