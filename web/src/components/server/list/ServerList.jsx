import { IconHome, IconExplore } from '@/components/ui/icons/Icons'
import ServerAvatar from '@/components/server/ServerAvatar'
import CreateServerDialog from '@/components/server/create/CreateServerDialog'
import { useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ServerListItem from '@/components/server/list/ServerListItem'
import { useContextMenuTrigger } from '@/components/ui/context'
import { ContextMenuType } from '@/types/ContextMenuType'
import { useDrag } from 'react-dnd'
import { DragItemTypes } from '@/types/DragItemTypes'
import { mergeRefs } from '@/utils/mergeRefs'
import { GET_JOINED_SERVERS } from '@/graphql/queries'
import { useQuery } from 'urql'

export default function ServerList() {
  const [{ data: joinedServersData }, refetchJoinedServers] = useQuery({
    query: GET_JOINED_SERVERS
  })
  const servers = joinedServersData?.getJoinedServers ?? []
  const { pathname } = useLocation()
  const { t } = useTranslation()

  return (
    <>
      <div
        className={`top-0 fixed left-0 bottom-0 flex flex-col items-center w-18 bg-white dark:bg-gray-900`}
      >
        <div className="h-full flex flex-col w-full">
          <ServerListItem name={t('home')} to="/me">
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
