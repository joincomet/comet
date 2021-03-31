import { EventEmitter } from 'events'
import { nanoid } from 'nanoid'
import { GlobalHandlers } from './handlers'
import { warn } from './util'

export const EventName = {
  RequestMenu: 'request_menu',
  RequestGlobalMenu: 'request_global_menu',
  CloseAllMenus: 'close_all_menus'
}

let state
export const initWindowState = () => {
  state = {
    emitter: new EventEmitter(),
    localMenuHandlers: {},
    globalMenuHandlers: [],
    longPressTimeout: null,
    handlerDataMap: {}
  }
  window.__ReactContextMenuWrapper = state

  document.body.addEventListener(
    'contextmenu',
    GlobalHandlers.handleContextMenu
  )
  document.body.addEventListener('touchstart', GlobalHandlers.handleTouchStart)
  document.body.addEventListener('touchmove', GlobalHandlers.handleTouchMove)
  document.body.addEventListener('touchend', GlobalHandlers.handleTouchEnd)
  document.body.addEventListener(
    'touchcancel',
    GlobalHandlers.handleTouchCancel
  )
}
export const hideAllMenus = () => {
  state.emitter.emit(EventName.CloseAllMenus)
}

export const addGenericListener = (name, listener) => {
  state.emitter.addListener(name, listener)
}
export const removeGenericListener = (name, listener) => {
  state.emitter.removeListener(name, listener)
}

export const addLocalMenuHandler = (menuId, handler) => {
  if (state.localMenuHandlers[menuId]) {
    warn(
      `Detected duplicate menu id: ${menuId}. Only the last one will be used.`
    )
  }
  state.localMenuHandlers[menuId] = handler
}
export const getLocalMenuHandler = menuId => {
  return state.localMenuHandlers[menuId]
}
export const removeLocalMenuHandler = menuId => {
  delete state.localMenuHandlers[menuId]
}

export const addGlobalMenuHandler = handler => {
  if (state.globalMenuHandlers.length > 0) {
    warn(
      'You have defined multiple global menus. Only the last one will be used'
    )
  }
  state.globalMenuHandlers.push(handler)
}
export const getGlobalMenuHandler = () => {
  if (state.globalMenuHandlers.length <= 0) return undefined
  return state.globalMenuHandlers[state.globalMenuHandlers.length - 1]
}
export const removeGlobalMenuHandler = handler => {
  const handlerIndex = state.globalMenuHandlers.indexOf(handler)
  if (handlerIndex !== -1) state.globalMenuHandlers.splice(handlerIndex)
}

export const addLongPressTimeout = (callback, timeout) => {
  state.longPressTimeout = setTimeout(callback, timeout)
}
export const hasLongPressTimeout = () =>
  typeof state.longPressTimeout === 'number'
export const clearLongPressTimeout = () => {
  const timeoutId = state.longPressTimeout
  if (timeoutId === null) return
  state.longPressTimeout = null
  clearTimeout(timeoutId)
}

export const generateHandlerDataId = () => nanoid()
export const saveHandlerData = (dataId, data) => {
  if (data === undefined) return
  state.handlerDataMap[dataId] = data
}
export const fetchHandlerData = dataId => {
  return state.handlerDataMap[dataId]
}
export const deleteHandlerData = dataId => {
  delete state.handlerDataMap[dataId]
}
