import { FiX } from 'react-icons/fi'
import { Modal } from 'react-responsive-modal'
import React from 'react'
import { useRouter } from 'next/router'
import CreateCommentForm from '@/components/modals/createcomment/CreateCommentForm'
import { useCommentStore } from '../../../lib/stores/useCommentStore'

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
