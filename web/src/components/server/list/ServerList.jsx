import { IconExplore, IconHome } from '@/components/ui/icons/Icons'
import ServerAvatar from '@/components/server/ServerAvatar'
import CreateServerDialog from '@/components/server/create/CreateServerDialog'
import { matchPath, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ServerListItem from '@/components/server/list/ServerListItem'
import { useContextMenuTrigger } from '@/components/ui/context'
import { ContextMenuType } from '@/types/ContextMenuType'
import { useDrag } from 'react-dnd'
import { DragItemTypes } from '@/types/DragItemTypes'
import { mergeRefs } from '@/utils/mergeRefs'
import { useJoinedServers } from '@/providers/DataProvider'
import { useStore } from '@/hooks/useStore'

export default function ServerList() {
  const servers = useJoinedServers()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const homePage = useStore(s => s.homePage)
  const homeActive = pathname.startsWith('/me')
  const exploreActive = pathname.startsWith('/explore')

  return (
    <>
      <div
        className={`flex flex-col items-center min-w-[4.5rem] w-18 bg-white dark:bg-gray-900`}
      >
        <div className="h-full flex flex-col items-center w-full divide-y dark:divide-gray-800 divide-gray-200">
          <div className="space-y-2 flex flex-col items-center py-2">
            <ServerListItem
              name={t('home')}
              to={`/me${homePage ? `/${homePage}` : ''}`}
              active={homeActive}
              className={`${
                homeActive
                  ? 'bg-blue-600'
                  : 'dark:bg-gray-800 bg-gray-200 hover:bg-blue-600 dark:hover:bg-blue-600'
              }`}
            >
              <IconHome
                className={`w-5 h-5 group-hover:text-white transition ${
                  homeActive ? 'text-white' : 'text-blue-500'
                }`}
              />
            </ServerListItem>

            <ServerListItem
              name={t('explore.title')}
              to="/explore"
              active={exploreActive}
              className={
                exploreActive
                  ? 'bg-green-600'
                  : 'dark:bg-gray-800 bg-gray-200 hover:bg-green-600 dark:hover:bg-green-600'
              }
            >
              <IconExplore
                className={`w-5 h-5 group-hover:text-white transition ${
                  exploreActive ? 'text-white' : 'text-green-500'
                }`}
              />
            </ServerListItem>

            <CreateServerDialog />
          </div>

          {!!servers && servers.length > 0 && (
            <div className="space-y-2 flex flex-col items-center py-2">
              {servers.map(server => (
                <ServerListServer server={server} key={server.id} />
              ))}
            </div>
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

  const { pathname } = useLocation()
  const matched = matchPath(pathname, { path: '/server/:serverId' })
  const serverId = matched?.params?.serverId
  const serverPages = useStore(s => s.serverPages)
  return (
    <ServerListItem
      to={`/server/${server.id}${
        serverPages[server.id] ? `/${serverPages[server.id]}` : ''
      }`}
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
