import { FiX } from 'react-icons/fi'
import { Modal } from 'react-responsive-modal'
import React from 'react'
import { useRouter } from 'next/router'
import CreatePostForm from '@/components/createpost/CreatePostForm'

export default function CreatePostModal() {
  const { query, pathname, push } = useRouter()

  const close = () => {
    const q = { ...query }
    delete q.createpost
    push({ pathname, query: q })
  }

  return (
    <Modal
      open={query.createpost === 'true'}
      onClose={() => close()}
      onOverlayClick={e => {
        e.stopPropagation()
        close()
      }}
      classNames={{
        modal:
          'overflow-hidden bg-transparent shadow-none max-w-screen-sm w-full',
        closeButton: 'top-8 right-8 text-tertiary focus:outline-none',
        overlay: 'bg-black bg-opacity-75'
      }}
      animationDuration={150}
      center
      blockScroll={false}
      closeIcon={<FiX size={20} />}
    >
      <CreatePostForm />
    </Modal>
  )
}
