import React from 'react'
import { IconInbox } from '@/lib/Icons'
import Header from '@/components/headers/base/Header'
import { useStore } from '@/lib/stores/useStore'
import HeaderTab from '@/components/headers/base/HeaderTab'

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
  const { inboxPage, setInboxPage } = useStore()
  return (
    <HeaderTab
      page={page}
      currentPage={inboxPage}
      setCurrentPage={setInboxPage}
    />
  )
}
