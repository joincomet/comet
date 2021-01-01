import { FiX } from 'react-icons/fi'
import { Modal } from 'react-responsive-modal'
import React, { useState } from 'react'
import Editor from '@/components/editor/Editor'
import toast from 'react-hot-toast'
import { useEditPostMutation } from '@/lib/mutations/postMutations'
import { useUpdatePost } from '@/lib/useUpdatePost'

export default function EditPostModal({ open, setOpen, post }) {
  const updatePost = useUpdatePost()

  const editPost = useEditPostMutation({
    onMutate: ({ newTextContent }) => {
      setOpen(false)
      updatePost(post.id36, { textContent: newTextContent })
      toast.success('Edited post!')
    }
  })
  const [textContent, setTextContent] = useState(post.textContent || '')

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOverlayClick={e => {
        e.stopPropagation()
        setOpen(false)
      }}
      animationDuration={150}
      center
      blockScroll={false}
      closeIcon={<FiX size={20} />}
    >
      <div className="md:rounded-2xl bg-white dark:bg-gray-800 p-6 space-y-4">
        <div className="text-secondary header-2">Edit Post Details</div>
        <Editor value={textContent} setValue={setTextContent} />
        <div className="flex items-center">
          <button
            onClick={() => {
              editPost.mutate({
                postId: post.id,
                newTextContent: textContent
              })
            }}
            disabled={
              !textContent ||
              textContent === `<p></p>` ||
              textContent === `<h3></h3>`
            }
            className="ml-auto h-9 bg-blue-600 rounded-full px-6 cursor-pointer text-sm font-medium inline-flex items-center disabled:opacity-50 focus:outline-none"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  )
}
