import { createContext, useContext } from 'react'
import useContextMenu from '@/hooks/use-context-menu'
import ContextMenu from '@/components/ui/context/ContextMenu'

export const ContextMenuContext = createContext({
  useContextTrigger: props => [{}]
})

export default function ContextMenuProvider({ children }) {
  const [
    bindMenu,
    bindMenuItem,
    useContextTrigger,
    { data, coords, setVisible }
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
        />
      </ContextMenuContext.Provider>
    </>
  )
}

export const useContextTrigger = data => {
  const { useContextTrigger } = useContext(ContextMenuContext)
  return useContextTrigger({ collect: () => data })
}
