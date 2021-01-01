import { FiX } from 'react-icons/fi'
import { Modal } from 'react-responsive-modal'
import React, { useEffect, useState } from 'react'
import { useEditCommentMutation } from '@/lib/mutations/commentMutations'
import Editor from '@/components/editor/Editor'
import toast from 'react-hot-toast'

export default function EditCommentModal({ open, setOpen, comment, setText }) {
  const editComment = useEditCommentMutation({
    onMutate: ({ newTextContent }) => {
      setOpen(false)
      setText(newTextContent)
      toast.success('Edited comment!')
    }
  })
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
      <div className="md:rounded-2xl bg-white dark:bg-gray-800 p-6 space-y-4">
        <div className="text-secondary header-2">Edit Comment</div>
        <Editor value={textContent} setValue={setTextContent} />
        <div className="flex items-center">
          <button
            onClick={() => {
              editComment.mutate({
                commentId: comment.id,
                newTextContent: textContent
              })
            }}
            disabled={
              !textContent ||
              textContent === `<p></p>` ||
              textContent === `<h3></h3>`
            }
            className="ml-auto h-9 bg-blue-600 rounded-full px-6 cursor-pointer text-sm font-medium inline-flex items-center disabled:opacity-50"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  )
}
