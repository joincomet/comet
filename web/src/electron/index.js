// Native
const { join } = require('path')

// Packages
const { BrowserWindow, app, shell, screen, Tray, Menu } = require('electron')
const isDev = require('electron-is-dev')

const contextMenu = require('electron-context-menu')

contextMenu()

const Store = require('electron-store')

const store = new Store()

let loadingScreen

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
    webPreferences: {
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
    backgroundColor: '#fff',
    width: 1280,
    height: 800,
    show: false,
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
  const window = new BrowserWindow(options)

  const port = process.env.PORT || 3000
  const url = isDev
    ? `http://localhost:${port}`
    : join(__dirname, '../src/out/index.html')

  // and load the index.html of the app.
  isDev ? window?.loadURL(url) : window?.loadFile(url)

  // window.once('ready-to-show', window.show)

  window.on('resize', saveBoundsSoon)
  window.on('move', saveBoundsSoon)
  window.on('close', e => {
    store.set('windowBounds', window.getNormalBounds())
    e.preventDefault()
    window.hide()
  })
  let saveBoundsCookie

  function saveBoundsSoon() {
    if (saveBoundsCookie) clearTimeout(saveBoundsCookie)
    saveBoundsCookie = setTimeout(() => {
      saveBoundsCookie = undefined
      if (window) store.set('windowBounds', window.getNormalBounds())
    }, 1000)
  }

  window.webContents.on('new-window', function (e, url) {
    e.preventDefault()
    shell.openExternal(url)
  })

  window.webContents.on('did-finish-load', () => {
    /// when the content has loaded, hide the loading screen and show the main window
    if (loadingScreen) {
      loadingScreen.close()
    }
    window.show()
    // if (isDev) window.webContents.openDevTools()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let appIcon = null
app.whenReady().then(() => {
  appIcon = new Tray('/public/icons/favicon.ico')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: function () {
        window.show()
      }
    },
    {
      label: 'Quit',
      click: function () {
        window.destroy()
        app.quit()
      }
    }
  ])

  contextMenu.items[1].checked = false

  appIcon.setContextMenu(contextMenu)

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
