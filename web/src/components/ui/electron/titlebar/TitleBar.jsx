import { useState } from 'react'
import {
  closeButton,
  windowButtonIcon,
  windowButton,
  windowControls,
  titlebar
} from './TitleBar.module.css'
import { VectorLogo } from '@/components/ui/vectors'

export default function TitleBar() {
  const { close, minimize, maximize, unmaximize, isMaximized } = window.electron
  const [maximized, setMaximized] = useState(isMaximized())
  const updateMaximized = () => setMaximized(isMaximized())
  return (
    <header className={titlebar}>
      <VectorLogo className="h-3 text-tertiary" />

      <div className={windowControls}>
        <div
          className={`${windowButton} flex`}
          onClick={() => {
            minimize()
            updateMaximized()
          }}
        >
          <img
            className={`${windowButtonIcon} hidden dark:block`}
            srcSet="./icons/titlebar/min-w-10.png 1x, ./icons/titlebar/min-w-12.png 1.25x, ./icons/titlebar/min-w-15.png 1.5x, ./icons/titlebar/min-w-15.png 1.75x, ./icons/titlebar/min-w-20.png 2x, ./icons/titlebar/min-w-20.png 2.25x, ./icons/titlebar/min-w-24.png 2.5x, ./icons/titlebar/min-w-30.png 3x, ./icons/titlebar/min-w-30.png 3.5x"
            draggable="false"
          />
          <img
            className={`${windowButtonIcon} block dark:hidden`}
            srcSet="./icons/titlebar/min-k-10.png 1x, ./icons/titlebar/min-k-12.png 1.25x, ./icons/titlebar/min-k-15.png 1.5x, ./icons/titlebar/min-k-15.png 1.75x, ./icons/titlebar/min-k-20.png 2x, ./icons/titlebar/min-k-20.png 2.25x, ./icons/titlebar/min-k-24.png 2.5x, ./icons/titlebar/min-k-30.png 3x, ./icons/titlebar/min-k-30.png 3.5x"
            draggable="false"
          />
        </div>
        <div
          className={`${windowButton} ${maximized ? 'hidden' : 'flex'}`}
          onClick={() => {
            maximize()
            updateMaximized()
          }}
        >
          <img
            className={`${windowButtonIcon} hidden dark:block`}
            srcSet="./icons/titlebar/max-w-10.png 1x, ./icons/titlebar/max-w-12.png 1.25x, ./icons/titlebar/max-w-15.png 1.5x, ./icons/titlebar/max-w-15.png 1.75x, ./icons/titlebar/max-w-20.png 2x, ./icons/titlebar/max-w-20.png 2.25x, ./icons/titlebar/max-w-24.png 2.5x, ./icons/titlebar/max-w-30.png 3x, ./icons/titlebar/max-w-30.png 3.5x"
            draggable="false"
          />
          <img
            className={`${windowButtonIcon} block dark:hidden`}
            srcSet="./icons/titlebar/max-k-10.png 1x, ./icons/titlebar/max-k-12.png 1.25x, ./icons/titlebar/max-k-15.png 1.5x, ./icons/titlebar/max-k-15.png 1.75x, ./icons/titlebar/max-k-20.png 2x, ./icons/titlebar/max-k-20.png 2.25x, ./icons/titlebar/max-k-24.png 2.5x, ./icons/titlebar/max-k-30.png 3x, ./icons/titlebar/max-k-30.png 3.5x"
            draggable="false"
          />
        </div>
        <div
          className={`${windowButton} ${maximized ? 'flex' : 'hidden'}`}
          onClick={() => {
            unmaximize()
            updateMaximized()
          }}
        >
          <img
            className={`${windowButtonIcon} hidden dark:block`}
            srcSet="./icons/titlebar/restore-w-10.png 1x, ./icons/titlebar/restore-w-12.png 1.25x, ./icons/titlebar/restore-w-15.png 1.5x, ./icons/titlebar/restore-w-15.png 1.75x, ./icons/titlebar/restore-w-20.png 2x, ./icons/titlebar/restore-w-20.png 2.25x, ./icons/titlebar/restore-w-24.png 2.5x, ./icons/titlebar/restore-w-30.png 3x, ./icons/titlebar/restore-w-30.png 3.5x"
            draggable="false"
          />
          <img
            className={`${windowButtonIcon} block dark:hidden`}
            srcSet="./icons/titlebar/restore-k-10.png 1x, ./icons/titlebar/restore-k-12.png 1.25x, ./icons/titlebar/restore-k-15.png 1.5x, ./icons/titlebar/restore-k-15.png 1.75x, ./icons/titlebar/restore-k-20.png 2x, ./icons/titlebar/restore-k-20.png 2.25x, ./icons/titlebar/restore-k-24.png 2.5x, ./icons/titlebar/restore-k-30.png 3x, ./icons/titlebar/restore-k-30.png 3.5x"
            draggable="false"
          />
        </div>
        <div
          className={`${windowButton} ${closeButton} flex`}
          onClick={() => {
            close()
            updateMaximized()
          }}
        >
          <img
            className={`${windowButtonIcon} hidden dark:block`}
            srcSet="./icons/titlebar/close-w-10.png 1x, ./icons/titlebar/close-w-12.png 1.25x, ./icons/titlebar/close-w-15.png 1.5x, ./icons/titlebar/close-w-15.png 1.75x, ./icons/titlebar/close-w-20.png 2x, ./icons/titlebar/close-w-20.png 2.25x, ./icons/titlebar/close-w-24.png 2.5x, ./icons/titlebar/close-w-30.png 3x, ./icons/titlebar/close-w-30.png 3.5x"
            draggable="false"
          />
          <img
            className={`${windowButtonIcon} block dark:hidden`}
            srcSet="./icons/titlebar/close-k-10.png 1x, ./icons/titlebar/close-k-12.png 1.25x, ./icons/titlebar/close-k-15.png 1.5x, ./icons/titlebar/close-k-15.png 1.75x, ./icons/titlebar/close-k-20.png 2x, ./icons/titlebar/close-k-20.png 2.25x, ./icons/titlebar/close-k-24.png 2.5x, ./icons/titlebar/close-k-30.png 3x, ./icons/titlebar/close-k-30.png 3.5x"
            draggable="false"
          />
        </div>
      </div>
    </header>
  )
}
