import { createContext, useContext, useState } from 'react'
import useContextMenu from '@/hooks/use-context-menu'
import ContextMenu from '@/components/ui/context/ContextMenu'
import { MOUSE_BUTTON } from '@/hooks/use-context-menu/buildUseContextMenuTrigger'

export const ContextMenuContext = createContext({
  useContextTrigger: props => [{}]
})

export default function ContextMenuProvider({ children }) {
  const [
    bindMenu,
    bindMenuItem,
    useContextTrigger,
    { data, coords, setVisible, isRight }
  ] = useContextMenu()
  const hideMenu = () => setVisible(false)

  return (
    <>
      <ContextMenuContext.Provider value={{ useContextTrigger }}>
        {children}
        <ContextMenu
          bindMenu={bindMenu}
          data={data}
          bindMenuItem={bindMenuItem}
          hideMenu={hideMenu}
          isRight={isRight}
        />
      </ContextMenuContext.Provider>
    </>
  )
}

export const useContextMenuTrigger = (data, leftClick = false) => {
  const { useContextTrigger } = useContext(ContextMenuContext)
  return useContextTrigger({
    collect: () => data,
    mouseButton: leftClick ? MOUSE_BUTTON.LEFT : MOUSE_BUTTON.RIGHT
  })
}
