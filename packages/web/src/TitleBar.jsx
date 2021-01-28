import React, {useEffect, useState} from "react";

export default function TitleBar() {
  const { close, minimize, maximize, unmaximize, isMaximized } = window.electron
  const [maximized, setMaximized] = useState(isMaximized())
  const updateMaximized = () => setMaximized(isMaximized())
  return (
    <header className={`titlebar`}>

      <div className="titlebar-title">Comet – All-in-one chat and forums for communities.</div>

      <div className="window-controls">

          <div className="window-button flex" id="min-button" onClick={() => {
            minimize()
            updateMaximized()
          }}>
            <img className="window-button-icon"
                 srcSet="icons/min-w-10.png 1x, icons/min-w-12.png 1.25x, icons/min-w-15.png 1.5x, icons/min-w-15.png 1.75x, icons/min-w-20.png 2x, icons/min-w-20.png 2.25x, icons/min-w-24.png 2.5x, icons/min-w-30.png 3x, icons/min-w-30.png 3.5x"
                 draggable="false"/>
          </div>
          <div className={`window-button ${maximized ? 'hidden' : 'flex'}`} id="max-button" onClick={() => {
            maximize()
            updateMaximized()
          }}>
            <img className="window-button-icon"
                 srcSet="icons/max-w-10.png 1x, icons/max-w-12.png 1.25x, icons/max-w-15.png 1.5x, icons/max-w-15.png 1.75x, icons/max-w-20.png 2x, icons/max-w-20.png 2.25x, icons/max-w-24.png 2.5x, icons/max-w-30.png 3x, icons/max-w-30.png 3.5x"
                 draggable="false"/>
          </div>
          <div className={`window-button ${maximized ? 'flex' : 'hidden'}`} id="restore-button" onClick={() => {
            unmaximize()
            updateMaximized()
          }}>
            <img className="window-button-icon"
                 srcSet="icons/restore-w-10.png 1x, icons/restore-w-12.png 1.25x, icons/restore-w-15.png 1.5x, icons/restore-w-15.png 1.75x, icons/restore-w-20.png 2x, icons/restore-w-20.png 2.25x, icons/restore-w-24.png 2.5x, icons/restore-w-30.png 3x, icons/restore-w-30.png 3.5x"
                 draggable="false"/>
          </div>
          <div className="window-button flex" id="close-button" onClick={() => {
            close()
            updateMaximized()
          }}>
            <img className="window-button-icon"
                 srcSet="icons/close-w-10.png 1x, icons/close-w-12.png 1.25x, icons/close-w-15.png 1.5x, icons/close-w-15.png 1.75x, icons/close-w-20.png 2x, icons/close-w-20.png 2.25x, icons/close-w-24.png 2.5x, icons/close-w-30.png 3x, icons/close-w-30.png 3.5x"
                 draggable="false"/>
          </div>

        </div>
    </header>
  )
}
