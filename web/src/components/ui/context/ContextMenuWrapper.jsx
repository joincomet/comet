import { useRef, useState, memo } from 'react'

import {
  ContextMenuEventContext,
  useInternalHandlers,
  useMenuPlacementStyle,
  useMenuToggleMethods
} from './hooks'

export const ContextMenuWrapper = memo(
  ({
    id,
    global = false,
    children,
    onShow,
    onHide,
    hideOnSelfClick = true,
    hideOnOutsideClick = true,
    hideOnEscape = true,
    hideOnScroll = true,
    hideOnWindowResize = true
  }) => {
    const wrapperRef = useRef()
    const [lastShowMenuEvent, setShowMenuEvent] = useState(null)
    const [placementStyle, setMenuPlacementStyle] = useState(null)
    const [showMenu, hideMenu] = useMenuToggleMethods(
      lastShowMenuEvent,
      setShowMenuEvent,
      onShow,
      onHide
    )
    useInternalHandlers(
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
    )
    useMenuPlacementStyle(wrapperRef, lastShowMenuEvent, setMenuPlacementStyle)

    if (!lastShowMenuEvent) return null

    const style = {
      position: 'fixed',
      zIndex: 999,
      left: -9999,
      top: -9999,
      ...placementStyle
    }
    return (
      <div ref={wrapperRef} style={style}>
        <ContextMenuEventContext.Provider value={lastShowMenuEvent}>
          {children}
        </ContextMenuEventContext.Provider>
      </div>
    )
  }
)
