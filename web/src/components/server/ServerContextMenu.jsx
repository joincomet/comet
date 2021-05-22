import { useTranslation } from 'react-i18next'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import {
  CurrentUserDocument,
  ServerFragmentDoc,
  useLeaveServerMutation
} from '@/graphql/hooks'
import { useApolloClient } from '@apollo/client'
import { useHistory, useLocation } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export default function ServerContextMenu({
  server,
  enableFeatured,
  enableFeaturedPosition,
  openDelete,
  ContextMenuItem
}) {
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()
  const apolloClient = useApolloClient()
  const [leaveServer] = useLeaveServerMutation()
  const { push } = useHistory()
  const { pathname } = useLocation()

  return (
    <>
      <ContextMenuSection>
        {currentUser?.isAdmin && (
          <>
            {!!enableFeatured && (
              <ContextMenuItem
                label={
                  server.isFeatured ? 'Remove from Featured' : 'Make Featured'
                }
              />
            )}
            {!!enableFeaturedPosition && server.isFeatured && (
              <>
                <ContextMenuItem label="Increment Featured Position" />
                <ContextMenuItem label="Decrement Featured Position" />
              </>
            )}
          </>
        )}
        {!!currentUser && server.owner.id !== currentUser.id && (
          <ContextMenuItem
            label={t('server.context.leave')}
            red
            onClick={() => {
              if (pathname.startsWith(`/+${server.id}`)) push('/')
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
        {!!currentUser &&
          !!openDelete &&
          (currentUser.isAdmin || server.owner.id === currentUser.id) && (
            <ContextMenuItem
              label="Delete Planet"
              red
              onClick={() => openDelete()}
            />
          )}
      </ContextMenuSection>
    </>
  )
}
