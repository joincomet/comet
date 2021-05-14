const { join } = require("path");
const { BrowserWindow } = require("electron");

module.exports = {
  createLoadingScreen: () => {
    let loadingScreen = new BrowserWindow({
      width: 432,
      height: 332,
      frame: false,
      transparent: true,
      icon: join(__dirname, "../resources/icon.png"),
      webPreferences: {
        enableRemoteModule: true,
        contextIsolation: true,
      },
    });
    loadingScreen.setResizable(false);
    loadingScreen.loadURL(join(__dirname, "./loading.html"));
    loadingScreen.on("closed", () => (loadingScreen = null));
    loadingScreen.webContents.on("did-finish-load", () => {
      loadingScreen.show();
    });
    return loadingScreen;
  },
};
