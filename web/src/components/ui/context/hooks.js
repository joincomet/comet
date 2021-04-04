import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef
} from 'react'

import {
  addGenericListener,
  addGlobalMenuHandler,
  addLocalMenuHandler,
  deleteHandlerData,
  EventName,
  generateHandlerDataId,
  removeGenericListener,
  removeGlobalMenuHandler,
  removeLocalMenuHandler,
  saveHandlerData
} from './globalState'
import { DataAttributes, LocalHandlers } from './handlers'
import { determineMenuPlacement, warn } from './util'

const UNINITIALIZED_SENTINEL = {}
export const useLazyValue = factory => {
  const valueRef = useRef(UNINITIALIZED_SENTINEL)
  if (valueRef.current === UNINITIALIZED_SENTINEL) valueRef.current = factory()
  return valueRef.current
}

export const ContextMenuEventContext = createContext(null)
export const useContextMenuEvent = () => {
  return useContext(ContextMenuEventContext)
}

export const useContextMenuTrigger = ({ menuId, data, ref }) => {
  ref = useRef(ref ? ref.current : null)

  // Define data ID to be constant throughout the lifetime of the trigger.
  const dataId = useLazyValue(() => generateHandlerDataId())

  useEffect(() => {
    saveHandlerData(dataId, data)
    return () => deleteHandlerData(dataId)
  }, [data, dataId])

  useEffect(() => {
    const { current } = ref
    if (!current) return

    if (menuId) current.setAttribute(DataAttributes.MenuId, menuId)
    current.setAttribute(DataAttributes.DataId, dataId)
    current.addEventListener('contextmenu', LocalHandlers.handleContextMenu)
    current.addEventListener('touchstart', LocalHandlers.handleTouchStart)
    current.addEventListener('touchmove', LocalHandlers.handleTouchMove)
    current.addEventListener('touchend', LocalHandlers.handleTouchEnd)
    current.addEventListener('touchcancel', LocalHandlers.handleTouchCancel)

    return () => {
      current.removeAttribute(DataAttributes.MenuId)
      current.removeAttribute(DataAttributes.DataId)
      current.removeEventListener(
        'contextmenu',
        LocalHandlers.handleContextMenu
      )
      current.removeEventListener('touchstart', LocalHandlers.handleTouchStart)
      current.removeEventListener('touchmove', LocalHandlers.handleTouchMove)
      current.removeEventListener('touchend', LocalHandlers.handleTouchEnd)
      current.removeEventListener(
        'touchcancel',
        LocalHandlers.handleTouchCancel
      )
    }
  }, [ref, dataId, menuId])

  return ref
}

export const useMenuToggleMethods = (
  lastShowMenuEvent,
  setShowMenuEvent,
  onShow,
  onHide
) => {
  const showMenu = useCallback(
    event => {
      setShowMenuEvent(event)
      if (onShow) onShow(event)
    },
    [setShowMenuEvent, onShow]
  )
  const hideMenu = useCallback(() => {
    if (lastShowMenuEvent === null) return
    setShowMenuEvent(null)
    if (onHide) onHide()
  }, [lastShowMenuEvent, setShowMenuEvent, onHide])
  return [showMenu, hideMenu]
}

export const useMenuPlacementStyle = (
  wrapperRef,
  lastShowMenuEvent,
  setMenuPlacementStyle
) => {
  useEffect(() => {
    if (lastShowMenuEvent) {
      const { clientX, clientY } = lastShowMenuEvent

      let menuWidth = 192
      let menuHeight = 200
      if (wrapperRef.current) {
        if (wrapperRef.current.childNodes.length > 0) {
          const child = wrapperRef.current.childNodes[0]
          menuWidth = child.offsetWidth
          menuHeight = child.offsetHeight
        }
      }

      setMenuPlacementStyle(
        determineMenuPlacement(clientX, clientY, menuWidth, menuHeight)
      )
    }

    return () => setMenuPlacementStyle(null)
  }, [lastShowMenuEvent, wrapperRef, setMenuPlacementStyle])
}

export const useInternalHandlers = (
  wrapperRef,
  lastShowMenuEvent,
  showMenu,
  hideMenu,
  id,
  global,
  hideOnSelfClick,
  hideOnOutsideClick,
  hideOnEscape,
  hideOnScroll,
  hideOnWindowResize
) => {
  const isVisible = !!lastShowMenuEvent
  const handleClick = useCallback(
    event => {
      const node = wrapperRef.current
      if (!node || !isVisible) return

      const wasOutside = event.target !== node && !node.contains(event.target)
      if (wasOutside && hideOnOutsideClick) {
        hideMenu()
      } else if (hideOnSelfClick) {
        if (event.touches) setTimeout(() => hideMenu(), 200)
        else hideMenu()
      }
    },
    [hideMenu, isVisible, wrapperRef, hideOnSelfClick, hideOnOutsideClick]
  )
  const handleKeydown = useCallback(
    event => {
      if (!isVisible) return
      // Hide on escape
      if (event.key === 'Escape' || event.code === 'Escape') hideMenu()
    },
    [hideMenu, isVisible]
  )

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('touchstart', handleClick)

    if (hideOnEscape) document.addEventListener('keydown', handleKeydown)
    if (hideOnScroll) document.addEventListener('scroll', hideMenu)
    if (hideOnWindowResize) window.addEventListener('resize', hideMenu)

    addGenericListener(EventName.CloseAllMenus, hideMenu)
    if (global) addGlobalMenuHandler(showMenu)
    else if (id) addLocalMenuHandler(id, showMenu)
    else warn('A menu should either be global or have an ID specified!')

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('touchstart', handleClick)
      if (hideOnEscape) document.removeEventListener('keydown', handleKeydown)
      if (hideOnScroll) document.removeEventListener('scroll', hideMenu)
      if (hideOnWindowResize) window.removeEventListener('resize', hideMenu)

      removeGenericListener(EventName.CloseAllMenus, hideMenu)
      if (global) removeGlobalMenuHandler(showMenu)
      else if (id) removeLocalMenuHandler(id)
    }
  }, [
    showMenu,
    hideMenu,
    id,
    global,
    handleClick,
    handleKeydown,
    hideOnEscape,
    hideOnScroll,
    hideOnWindowResize
  ])
}
