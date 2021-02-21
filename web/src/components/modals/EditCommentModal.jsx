import { FiX } from 'react-icons/fi'
import { Modal } from 'react-responsive-modal'
import React, { useState } from 'react'
// import Editor from '@/components/editor/Editor'
import toast from 'react-hot-toast'
import { useMutation } from 'urql'
import { EDIT_COMMENT_MUTATION } from '@/lib/mutations'

export default function EditCommentModal({ open, setOpen, comment, setText }) {
  const [editComment] = useMutation(EDIT_COMMENT_MUTATION)

  const [textContent, setTextContent] = useState(comment.textContent)

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      animationDuration={150}
      center
      blockScroll={false}
      closeIcon={<FiX size={20} />}
    >
      <div className="lg:rounded-2xl bg-white dark:bg-gray-800 p-6 space-y-4">
        <div className="text-secondary header-2">Edit Comment</div>
        {/*<Editor value={textContent} setValue={setTextContent} />*/}
        <div className="flex items-center">
          <button
            onClick={() => {
              editComment.mutate({
                commentId: comment.id,
                newTextContent: textContent
              })
            }}
            disabled={!textContent}
            className="ml-auto h-9 bg-blue-600 rounded-full px-6 cursor-pointer text-sm font-medium inline-flex items-center disabled:opacity-50"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  )
}
