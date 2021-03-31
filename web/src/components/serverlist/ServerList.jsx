import { IconHome, IconExplore } from '@/lib/Icons'
import ServerAvatar from '@/components/avatars/ServerAvatar'
import CreateServerDialog from '@/components/dialogs/createserver/CreateServerDialog'
import { useLocation, useParams } from 'react-router-dom'
import { useJoinedServers } from '@/components/providers/DataProvider'
import { useTranslation } from 'react-i18next'
import ServerListItem from '@/components/serverlist/ServerListItem'
import { useContextMenuTrigger } from '@/context-menu'
import { ContextMenuType } from '@/components/context-menus/ContextMenuType'
import { useDrag } from 'react-dnd'
import { DragItemTypes } from '@/lib/DragItemTypes'
import { mergeRefs } from '@/lib/mergeRefs'

export default function ServerList() {
  const { pathname } = useLocation()

  const servers = useJoinedServers()

  const { t } = useTranslation()

  return (
    <>
      <div
        className={`top-0 electron:top-5.5 fixed left-0 bottom-0 flex flex-col items-center w-18 bg-white dark:bg-gray-900`}
      >
        <div className="h-full flex flex-col w-full">
          <ServerListItem name={t('home')} to="/posts">
            <IconHome
              className={`w-5 h-5 group-hover:text-white transition ${
                pathname === '/' ? 'text-white' : 'text-blue-500'
              }`}
            />
          </ServerListItem>

          <ServerListItem name={t('explore.title')} to="/explore">
            <IconExplore
              className={`w-5 h-5 group-hover:text-white transition ${
                pathname === '/explore' ? 'text-white' : 'text-green-500'
              }`}
            />
          </ServerListItem>

          <CreateServerDialog />

          {servers.length > 0 && (
            <>
              <div className="border-b-2 border-gray-200 dark:border-gray-800 h-2 mx-3 box-content" />

              {servers.map(server => (
                <ServerListServer server={server} key={server.id} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

function ServerListServer({ server }) {
  const contextMenuRef = useContextMenuTrigger({
    menuId: ContextMenuType.Server,
    data: { server }
  })

  const [{ opacity }, dragRef] = useDrag({
    type: DragItemTypes.Server,
    item: server,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.6 : 1
    })
  })

  const { serverId } = useParams()

  return (
    <ServerListItem
      to={`/server/${server.id}`}
      name={server.name}
      ref={mergeRefs(contextMenuRef, dragRef)}
      active={serverId === server.id}
    >
      <ServerAvatar
        server={server}
        size={12}
        style={{ opacity }}
        className="bg-gray-200 dark:bg-gray-800"
      />
    </ServerListItem>
  )
}
