import { useStore } from '@/hooks/useStore'
import InboxHeader from '@/pages/me/inbox/InboxHeader'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'
import PageView from '@/components/ui/page/PageView'
import { useRepliesQuery } from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import Reply from '@/components/reply/Reply'

const label =
  'px-2 pb-2 text-11 text-tertiary uppercase tracking-widest font-semibold'

export default function InboxPage() {
  const inboxPage = useStore(s => s.inboxPage)
  useSetHomePage(`inbox`)
  const [currentUser] = useCurrentUser()
  const { data } = useRepliesQuery({
    variables: {
      input: { unreadOnly: inboxPage === 'Unread' }
    },
    skip: !currentUser
  })
  const replies = data?.replies ?? []
  return (
    <Page header={<InboxHeader />}>
      <PageView>
        {inboxPage === 'Unread' && (
          <>
            <div className={label}>Unread - {replies.length}</div>
          </>
        )}
        {inboxPage === 'All' && (
          <>
            <div className={label}>All - {replies.length}</div>
          </>
        )}

        <div className="space-y-1.5">
          {replies.map(reply => (
            <Reply reply={reply} key={reply.id} />
          ))}
        </div>
      </PageView>
    </Page>
  )
}
