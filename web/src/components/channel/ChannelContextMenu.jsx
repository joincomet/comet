import { useTranslation } from 'react-i18next'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { matchPath, useHistory, useLocation } from 'react-router-dom'
import {
  CurrentUserDocument,
  ServerPermission,
  useDeleteChannelMutation
} from '@/graphql/hooks'
import { useApolloClient } from '@apollo/client'

export default function ChannelContextMenu({ channel, ContextMenuItem }) {
  const { t } = useTranslation()
  const { push } = useHistory()
  const { pathname } = useLocation()
  const matchedServer = matchPath(pathname, {
    path: '/server/:serverId'
  })
  const matchedChannel = matchPath(pathname, {
    path: '/server/:serverId/channel/:channelId'
  })
  const serverId = matchedServer?.params?.serverId
  const channelId = matchedChannel?.params?.channelId
  const [canManageChannels] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.ManageChannels]
  })

  const apolloClient = useApolloClient()
  const [deleteChannel] = useDeleteChannelMutation()

  return (
    <>
      <ContextMenuSection>
        <ContextMenuItem label={t('channel.context.markRead')} />
        {/*<ContextMenuItem label={t('channel.context.mute')} />*/}
        <ContextMenuItem label={t('channel.context.edit')} />
        {canManageChannels && (
          <ContextMenuItem
            label={t('channel.context.delete')}
            red
            onClick={() => {
              if (pathname === `/server/${serverId}/channel/${channelId}`)
                push(`/server/${serverId}`)
              deleteChannel({ variables: { input: { channelId: channel.id } } })
              const cache = apolloClient.cache
              const data = cache.readQuery({ query: CurrentUserDocument })
              const clone = JSON.parse(JSON.stringify(data))
              const server = clone.user.servers.find(s => s.id === serverId)
              server.channels = server.channels.filter(c => c.id !== channel.id)
              cache.writeQuery({ query: CurrentUserDocument, data: clone })
            }}
          />
        )}
      </ContextMenuSection>
    </>
  )
}
