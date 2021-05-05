import { useRef } from 'react'
import { getCoords } from './helpers'

export const MOUSE_BUTTON = {
  LEFT: 0,
  RIGHT: 2
}
const defaultConfig = {
  disable: false,
  holdToDisplay: 1000,
  posX: 0,
  posY: 0,
  mouseButton: MOUSE_BUTTON.RIGHT,
  disableIfShiftIsPressed: false,
  collect() {}
}

export default function buildUseContextMenuTrigger(
  triggerVisible,
  hideIfVisible
) {
  return _config => {
    const config = Object.assign({}, defaultConfig, _config)
    const touchHandled = useRef(false)
    const mouseDownTimeoutId = useRef()
    const touchstartTimeoutId = useRef()

    const handleContextClick = event => {
      if (event.ctrlKey) return
      // if (config.disable) return
      // if (config.disableIfShiftIsPressed && event.shiftKey) return

      event.preventDefault()
      event.stopPropagation()

      triggerVisible(getCoords(event, config), {
        ...config.collect(),
        href: event.target.href
      })
    }

    const handleMouseDown = event => {
      if (config.holdToDisplay >= 0 && event.button === MOUSE_BUTTON.LEFT) {
        event.persist()
        event.stopPropagation()
        if (config.mouseButton === MOUSE_BUTTON.RIGHT) hideIfVisible()
        if (config.mouseButton === MOUSE_BUTTON.LEFT)
          triggerVisible(getCoords(event, config), config.collect())

        /*mouseDownTimeoutId.current = setTimeout(
          () => handleContextClick(event),
          config.holdToDisplay
        )*/
      }
    }

    const handleMouseUp = event => {
      if (event.button === MOUSE_BUTTON.LEFT) {
        clearTimeout(mouseDownTimeoutId.current)
      }
    }

    const handleMouseOut = event => {
      if (event.button === MOUSE_BUTTON.LEFT) {
        clearTimeout(mouseDownTimeoutId.current)
      }
    }

    const handleTouchstart = event => {
      touchHandled.current = false

      if (config.holdToDisplay >= 0) {
        event.persist()
        event.stopPropagation()

        touchstartTimeoutId.current = setTimeout(() => {
          handleContextClick(event)
          touchHandled.current = true
        }, config.holdToDisplay)
      }
    }

    const handleTouchEnd = event => {
      if (touchHandled.current) {
        event.preventDefault()
      }
      clearTimeout(touchstartTimeoutId.current)
    }

    const handleContextMenu = event => {
      if (event.button === config.mouseButton) {
        handleContextClick(event)
      }
    }

    const handleMouseClick = event => {
      if (event.button === config.mouseButton) {
        handleContextClick(event)
      }
    }

    const triggerBind = {
      onContextMenu: handleContextMenu,
      onClick: handleMouseClick
      // onMouseDown: handleMouseDown,
      // onMouseUp: handleMouseUp,
      // onTouchStart: handleTouchstart,
      // onTouchEnd: handleTouchEnd,
      // onMouseOut: handleMouseOut
    }

    return [triggerBind]
  }
}
