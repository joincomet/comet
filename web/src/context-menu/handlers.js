import {
  addLongPressTimeout,
  clearLongPressTimeout,
  fetchHandlerData,
  getGlobalMenuHandler,
  getLocalMenuHandler,
  hasLongPressTimeout,
  hideAllMenus
} from './globalState'

const LONG_PRESS_DURATION_IN_MS = 420

export const DataAttributes = {
  MenuId: 'data-contextmenu-menu-id',
  DataId: 'data-contextmenu-data-id'
}

const isTouchEvent = event => {
  return !!event.targetTouches
}
const createMenuEvent = (event, data) => {
  let clientX
  let clientY
  if (isTouchEvent(event)) {
    const touch = event.targetTouches[0]
    clientX = touch.clientX
    clientY = touch.clientY
  } else {
    clientX = event.clientX
    clientY = event.clientY
  }

  return {
    clientX,
    clientY,
    data
  }
}

const getData = target => {
  let data = undefined
  if (target) {
    const dataId = target.getAttribute(DataAttributes.DataId)
    data = dataId ? fetchHandlerData(dataId) : undefined
  }
  return data
}

const GenericHandlers = {
  handleContextMenu: (event, target) => {
    // When menus are triggered using Ctrl + Right Click, we bring up the native context menu.
    if (event.ctrlKey) return

    const menuId = target ? target.getAttribute(DataAttributes.MenuId) : null
    const handler = menuId
      ? getLocalMenuHandler(menuId)
      : getGlobalMenuHandler()
    if (!handler) return

    event.preventDefault()
    event.stopPropagation()

    const data = getData(target)
    const menuEvent = createMenuEvent(event, data)

    hideAllMenus()
    handler(menuEvent)
  },
  handleTouchStart: (event, target) => {
    const menuId = target ? target.getAttribute(DataAttributes.MenuId) : null
    const handler = menuId
      ? getLocalMenuHandler(menuId)
      : getGlobalMenuHandler()
    if (!handler || hasLongPressTimeout()) return

    const data = getData(target)
    const menuEvent = createMenuEvent(event, data)
    addLongPressTimeout(() => {
      clearLongPressTimeout()
      hideAllMenus()
      handler(menuEvent)
    }, LONG_PRESS_DURATION_IN_MS)
  },
  handleTouchCancel: (event, target) => clearLongPressTimeout()
}

export const GlobalHandlers = {
  handleContextMenu: e => GenericHandlers.handleContextMenu(e, null),
  handleTouchStart: e => GenericHandlers.handleTouchStart(e, null),
  handleTouchMove: e => GenericHandlers.handleTouchCancel(e, null),
  handleTouchEnd: e => GenericHandlers.handleTouchCancel(e, null),
  handleTouchCancel: e => GenericHandlers.handleTouchCancel(e, null)
}

export const LocalHandlers = {
  handleContextMenu: e => GenericHandlers.handleContextMenu(e, e.currentTarget),
  handleTouchStart: e => GenericHandlers.handleTouchStart(e, e.currentTarget),
  handleTouchMove: e => GenericHandlers.handleTouchCancel(e, e.currentTarget),
  handleTouchEnd: e => GenericHandlers.handleTouchCancel(e, e.currentTarget),
  handleTouchCancel: e => GenericHandlers.handleTouchCancel(e, e.currentTarget)
}
