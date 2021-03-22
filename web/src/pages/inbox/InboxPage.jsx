import React from 'react'
import Header from '@/components/headers/base/Header'
import { IconInbox } from '@/lib/Icons'
import { useStore } from '@/lib/stores/useStore'

const label =
  'px-2 pb-2 text-11 text-tertiary uppercase tracking-widest font-semibold'

export default function InboxPage() {
  const { inboxPage } = useStore()
  return (
    <>
      <Header
        icon={<IconInbox className="h-5 w-5" />}
        title="Inbox"
        showDivider
      >
        <div className="flex items-center space-x-4">
          <InboxTab page="Unread" />
          <InboxTab page="All" />
        </div>
      </Header>

      <div className="h-full pl-76 pt-12">
        <div className="h-full dark:bg-gray-750 px-6 py-4">
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
        </div>
      </div>
    </>
  )
}

function InboxTab({ page }) {
  const { inboxPage, setInboxPage } = useStore()
  return (
    <button
      onClick={() => setInboxPage(page)}
      className={`text-base rounded px-1.5 py-0.5 cursor-pointer select-none focus:outline-none ${
        page === inboxPage ? 'text-secondary dark:bg-gray-700' : 'text-tertiary'
      }`}
    >
      {page}
    </button>
  )
}
