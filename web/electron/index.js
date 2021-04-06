require('@electron/remote/main').initialize()

const { join } = require('path')
const { BrowserWindow, app, shell, screen } = require('electron')
const isDev = require('electron-is-dev')
const contextMenu = require('electron-context-menu')
const Store = require('electron-store')
const DiscordRPC = require('discord-rpc')

contextMenu({ showInspectElement: true }) // TODO disable this
const store = new Store()

const icon = join(__dirname, './resources/icon.png')

let loadingScreen
let mainWindow

const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow({
    /// set the window height / width
    width: 300,
    height: 300,
    /// remove the window frame, so it will rendered without frames
    frame: false,
    /// and set the transparency to true, to remove any kind of background
    transparent: true,
    icon,
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: true
    }
  })
  loadingScreen.setResizable(false)
  loadingScreen.loadURL(join(__dirname, './loading.html'))
  loadingScreen.on('closed', () => (loadingScreen = null))
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show()
  })
}

function createWindow() {
  const options = {
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#fff',
    width: 1280,
    height: 800,
    show: false,
    icon,
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
      enableRemoteModule: true
    }
  }
  const bounds = store.get('windowBounds')

  if (bounds) {
    const area = screen.getDisplayMatching(bounds).workArea
    // If the saved position still valid (the window is entirely inside the display area), use it.
    if (
      bounds.x >= area.x &&
      bounds.y >= area.y &&
      bounds.x + bounds.width <= area.x + area.width &&
      bounds.y + bounds.height <= area.y + area.height
    ) {
      options.x = bounds.x
      options.y = bounds.y
    }
    // If the saved size is still valid, use it.
    if (bounds.width <= area.width || bounds.height <= area.height) {
      options.width = bounds.width
      options.height = bounds.height
    }
  } else {
    const display = screen.getPrimaryDisplay().workArea
    options.width = display.width * (2 / 3)
    options.height = display.height * (2 / 3)
  }

  // Create the browser window.
  mainWindow = new BrowserWindow(options)

  const port = process.env.PORT || 3000
  const dev = isDev
  const url = dev
    ? `http://localhost:${port}`
    : join(__dirname, '../dist/index.html')

  // and load the index.html of the app.
  dev ? mainWindow?.loadURL(url) : mainWindow?.loadFile(url)

  // window.once('ready-to-show', window.show)

  mainWindow.on('resize', saveBoundsSoon)
  mainWindow.on('move', saveBoundsSoon)
  mainWindow.on('close', () =>
    store.set('windowBounds', mainWindow.getNormalBounds())
  )
  let saveBoundsCookie

  function saveBoundsSoon() {
    if (saveBoundsCookie) clearTimeout(saveBoundsCookie)
    saveBoundsCookie = setTimeout(() => {
      saveBoundsCookie = undefined
      if (mainWindow) store.set('windowBounds', mainWindow.getNormalBounds())
    }, 1000)
  }

  mainWindow.webContents.on('new-window', function (e, url) {
    e.preventDefault()
    shell.openExternal(url)
  })

  mainWindow.webContents.on('did-finish-load', () => {
    /// when the content has loaded, hide the loading screen and show the main window
    if (loadingScreen) {
      loadingScreen.close()
    }
    mainWindow.show()
    // if (isDev) window.webContents.openDevTools()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createLoadingScreen()
  createWindow()

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

// Set this to your Client ID.
const clientId = '829047983378792518'

// Only needed if you want to use spectate, join, or ask to join
DiscordRPC.register(clientId)

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
