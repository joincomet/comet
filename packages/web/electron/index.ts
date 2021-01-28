// Native
import { join } from 'path';

// Packages
import { BrowserWindow, app, shell } from 'electron';
import isDev from 'electron-is-dev';

const contextMenu = require('electron-context-menu')

contextMenu()

const Store = require('electron-store');

const store = new Store();

function createWindow() {
  const opts = {
    frame: false,
    backgroundColor: '#fff',
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
      enableRemoteModule: true
    }
  }
  Object.assign(opts, store.get('winBounds'))

  // Create the browser window.
  const win = new BrowserWindow(opts);

  const port = process.env.PORT || 3000;
  const url = isDev
    ? `http://localhost:${port}`
    : join(__dirname, '../src/out/index.html');

  // and load the index.html of the app.
  isDev ? win?.loadURL(url) : win?.loadFile(url);

  win.once('ready-to-show', win.show)
  win.on('close', () => store.set('winBounds', win.getBounds()))

  // Open the DevTools.
  if (isDev) win.webContents.openDevTools();

  win.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
