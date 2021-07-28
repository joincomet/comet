const { contextBridge, ipcRenderer } = require("electron");
const { getCurrentWindow, app } = require("@electron/remote");

contextBridge.exposeInMainWorld("electron", {
  minimize: () => getCurrentWindow().minimize(),
  maximize: () => getCurrentWindow().maximize(),
  unmaximize: () => getCurrentWindow().unmaximize(),
  close: () => getCurrentWindow().close(),
  show: () => getCurrentWindow().show(),
  restart: () => {
    app.relaunch();
    app.exit();
  },
  isMaximized: () => getCurrentWindow().isMaximized(),
  isEmojiPanelSupported: () => app.isEmojiPanelSupported(),
  showEmojiPanel: () => app.showEmojiPanel(),
  on: (event, func) => ipcRenderer.on(event, (event, ...args) => func(...args)),
});

/*
const reload = () => getCurrentWindow().reload()
const unregister = () => globalShortcut.unregister('CommandOrControl+R', reload)
const register = () => globalShortcut.register('CommandOrControl+R', reload) // or 'F5';
register()
window.addEventListener('focus', register)
window.addEventListener('blur', unregister)
window.addEventListener('beforeunload', unregister)
*/
