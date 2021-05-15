import { IconInbox } from '@/components/ui/icons/Icons'
import Header from '@/components/ui/header/Header'
import { useStore } from '@/hooks/useStore'
import HeaderTab from '@/components/ui/header/HeaderTab'

export default function InboxHeader() {
  return (
    <Header icon={<IconInbox className="h-5 w-5" />} title="Inbox" showDivider>
      <div className="flex items-center space-x-4">
        <InboxTab page="Unread" />
        <InboxTab page="All" />
      </div>
    </Header>
  )
}

function InboxTab({ page }) {
  const [inboxPage, setInboxPage] = useStore(s => [s.inboxPage, s.setInboxPage])
  return (
    <HeaderTab
      page={page}
      currentPage={inboxPage}
      setCurrentPage={setInboxPage}
    />
  )
}
