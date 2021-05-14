import { useTranslation } from 'react-i18next'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import {
  CurrentUserDocument,
  PostsDocument,
  ServerFragmentDoc,
  useLeaveServerMutation
} from '@/graphql/hooks'
import { useApolloClient } from '@apollo/client'
import { useHistory, useLocation } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export default function ServerContextMenu({ server, ContextMenuItem }) {
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()
  const apolloClient = useApolloClient()
  const [leaveServer] = useLeaveServerMutation()
  const { push } = useHistory()
  const { pathname } = useLocation()

  return (
    <>
      <ContextMenuSection>
        <ContextMenuItem label={t('server.context.markRead')} />
        {/*<ContextMenuItem label={t('server.context.mute')} />*/}
        <ContextMenuItem label={t('server.context.invite')} />
        {server.owner.id !== currentUser.id && (
          <ContextMenuItem
            label={t('server.context.leave')}
            red
            onClick={() => {
              if (pathname.startsWith(`/+${server.id}`)) push('/home')
              leaveServer({ variables: { input: { serverId: server.id } } })
              const data = apolloClient.cache.readQuery({
                query: CurrentUserDocument
              })
              apolloClient.cache.writeQuery({
                query: CurrentUserDocument,
                data: {
                  user: {
                    ...data.user,
                    servers: data.user.servers.filter(s => s.id !== server.id)
                  }
                }
              })
              const frag = apolloClient.cache.readFragment({
                fragment: ServerFragmentDoc,
                id: `Server:${server.id}`
              })
              apolloClient.cache.writeFragment({
                fragment: ServerFragmentDoc,
                id: `Server:${server.id}`,
                data: { ...frag, isJoined: false }
              })
            }}
          />
        )}
      </ContextMenuSection>
    </>
  )
}
