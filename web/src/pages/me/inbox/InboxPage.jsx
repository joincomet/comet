import { useStore } from '@/hooks/useStore'
import InboxHeader from '@/pages/me/inbox/InboxHeader'
import Container from '@/components/ui/Container'
import View from '@/components/ui/View'
import { useSetHomePage } from '@/hooks/useSetHomePage'

const label =
  'px-2 pb-2 text-11 text-tertiary uppercase tracking-widest font-semibold'

export default function InboxPage() {
  const inboxPage = useStore(s => s.inboxPage)
  useSetHomePage(`inbox`)
  return (
    <>
      <InboxHeader />

      <Container>
        <View className="px-6 py-4">
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
        </View>
      </Container>
    </>
  )
}
