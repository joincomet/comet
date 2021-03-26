import React from 'react'
import Header from '@/components/headers/base/Header'
import { IconInbox } from '@/lib/Icons'
import { useStore } from '@/lib/stores/useStore'
import HeaderTab from '@/components/headers/base/HeaderTab'
import InboxHeader from '@/components/headers/InboxHeader'
import Container from '@/components/Container'
import View from '@/components/View'

const label =
  'px-2 pb-2 text-11 text-tertiary uppercase tracking-widest font-semibold'

export default function InboxPage() {
  const { inboxPage } = useStore()
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
