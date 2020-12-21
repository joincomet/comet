import { FiX } from 'react-icons/fi'
import { Modal } from 'react-responsive-modal'
import React from 'react'
import { useRouter } from 'next/router'
import CreateCommentForm from '@/components/createcomment/CreateCommentForm'

export default function CreateCommentModal({ post, parentComment }) {
  const { query, pathname, push } = useRouter()

  const close = () => {
    const q = { ...query }
    delete q.createcomment
    push({ pathname, query: q })
  }

  return (
    <Modal
      open={query.createcomment === 'true'}
      onClose={() => close()}
      onOverlayClick={e => {
        e.stopPropagation()
        close()
      }}
      classNames={{
        modal:
          'overflow-hidden bg-transparent shadow-none max-w-screen-sm w-full p-0 m-0',
        closeButton: 'top-8 right-8 text-tertiary focus:outline-none',
        overlay: 'bg-black bg-opacity-75'
      }}
      animationDuration={150}
      center
      blockScroll={false}
      closeIcon={<FiX size={20} />}
    >
      <CreateCommentForm
        post={post}
        parentComment={parentComment}
        close={close}
      />
    </Modal>
  )
}
