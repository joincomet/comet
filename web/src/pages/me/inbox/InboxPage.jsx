import { useStore } from '@/hooks/useStore'
import InboxHeader from '@/pages/me/inbox/InboxHeader'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'
import PageView from '@/components/ui/page/PageView'

const label =
  'px-2 pb-2 text-11 text-tertiary uppercase tracking-widest font-semibold'

export default function InboxPage() {
  const inboxPage = useStore(s => s.inboxPage)
  useSetHomePage(`inbox`)
  return (
    <Page header={<InboxHeader />}>
      <PageView>
        {inboxPage === 'Unread' && (
          <>
            <div className={label}>Unread - {0}</div>
          </>
        )}
        {inboxPage === 'All' && (
          <>
            <div className={label}>All - {0}</div>
          </>
        )}
      </PageView>
    </Page>
  )
}
