const { join } = require("path");
const { app, BrowserWindow, shell, screen } = require("electron");
const Store = require("electron-store");
const isDev = !app.isPackaged;

const store = new Store();

module.exports = {
  createWindow: () => {
    const options = {
      frame: false,
      titleBarStyle: "hidden",
      backgroundColor: "#17181E",
      width: 1280,
      height: 800,
      show: false,
      icon: join(__dirname, "./resources/icon.png"),
      webPreferences: {
        contextIsolation: true,
        preload: join(__dirname, "preload.js"),
        enableRemoteModule: true,
      },
    };
    const bounds = store.get("windowBounds");

    if (bounds) {
      const area = screen.getDisplayMatching(bounds).workArea;
      // If the saved position still valid (the window is entirely inside the display area), use it.
      if (
        bounds.x >= area.x &&
        bounds.y >= area.y &&
        bounds.x + bounds.width <= area.x + area.width &&
        bounds.y + bounds.height <= area.y + area.height
      ) {
        options.x = bounds.x;
        options.y = bounds.y;
      }
      // If the saved size is still valid, use it.
      if (bounds.width <= area.width || bounds.height <= area.height) {
        options.width = bounds.width;
        options.height = bounds.height;
      }
    } else {
      const display = screen.getPrimaryDisplay().workArea;
      options.width = display.width * (2 / 3);
      options.height = display.height * (2 / 3);
    }

    const mainWindow = new BrowserWindow(options);

    const port = process.env.PORT || 3000;
    const url = isDev
      ? `http://localhost:${port}`
      : join(__dirname, "../dist/index.html");

    isDev ? mainWindow?.loadURL(url) : mainWindow?.loadFile(url);

    mainWindow.on("resize", saveBoundsSoon);
    mainWindow.on("move", saveBoundsSoon);
    mainWindow.on("close", (event) => {
      store.set("windowBounds", mainWindow.getNormalBounds());
      event.preventDefault();
      mainWindow.hide();
      mainWindow.send("windowClosed");
    });

    mainWindow.on("restore", () => mainWindow.send("windowOpened"));
    mainWindow.on("focus", () => mainWindow.send("windowOpened"));

    mainWindow.on("show", () => {
      setTimeout(() => {
        mainWindow.focus();
      }, 200);
    });

    let saveBoundsCookie;

    function saveBoundsSoon() {
      if (saveBoundsCookie) clearTimeout(saveBoundsCookie);
      saveBoundsCookie = setTimeout(() => {
        saveBoundsCookie = undefined;
        if (mainWindow) store.set("windowBounds", mainWindow.getNormalBounds());
      }, 1000);
    }

    mainWindow.webContents.on("new-window", function (e, url) {
      e.preventDefault();
      shell.openExternal(url);
    });

    return mainWindow;
  },
};
