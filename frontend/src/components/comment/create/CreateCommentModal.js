import { FiX } from 'react-icons/fi'
import { Modal } from 'react-responsive-modal'
import React from 'react'
import { useRouter } from 'next/router'
import CreateCommentForm from '@/components/comment/create/CreateCommentForm'
import { useCommentStore } from '@/lib/stores/useCommentStore'

export default function CreateCommentModal({
  post,
  parentComment,
  commentVariables
}) {
  const { createComment, setCreateComment } = useCommentStore()

  return (
    <Modal
      open={createComment}
      onClose={() => setCreateComment(false)}
      onOverlayClick={e => {
        e.stopPropagation()
        setCreateComment(false)
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
        commentVariables={commentVariables}
      />
    </Modal>
  )
}
