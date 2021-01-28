/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IpcRenderer, contextBridge, remote } from 'electron'

declare global {
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer
    }
  }
}

contextBridge.exposeInMainWorld('electron', {
  minimize: () => remote.getCurrentWindow().minimize(),
  maximize: () => remote.getCurrentWindow().maximize(),
  unmaximize: () => remote.getCurrentWindow().unmaximize(),
  close: () => remote.getCurrentWindow().close(),
  isMaximized: () => remote.getCurrentWindow().isMaximized(),
})
