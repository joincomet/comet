import { FiX } from 'react-icons/fi'
import { Modal } from 'react-responsive-modal'
import React, { useEffect, useState } from 'react'
import { useEditCommentMutation } from '@/lib/mutations/commentMutations'
import Editor from '@/components/Editor'
import { emptyEditor } from '@/lib/emptyEditor'
import { deserialize, serialize, textContentEmpty } from '@/lib/serializeHtml'
import toast from 'react-hot-toast'
import { useEditPostMutation } from '@/lib/mutations/postMutations'
import { useQueryClient } from 'react-query'
import { usePost } from '@/lib/queries/usePost'

export default function EditPostModal({ open, setOpen, post, setText }) {
  const editPost = useEditPostMutation({
    onMutate: ({ newTextContent }) => {
      setOpen(false)
      setText(newTextContent)
      toast.success('Edited post!')
      post.textContent = newTextContent
    }
  })
  const [textContent, setTextContent] = useState(emptyEditor)

  useEffect(
    () =>
      setTextContent(
        deserialize(
          new DOMParser().parseFromString(post.textContent, 'text/html').body
        )
      ),
    []
  )

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
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
      <div className="md:rounded-2xl bg-white dark:bg-gray-800 p-6 space-y-4">
        <div className="text-secondary header-2">Edit Post</div>
        <Editor value={textContent} setValue={setTextContent} />
        <div className="flex items-center">
          <button
            onClick={() => {
              if (textContentEmpty(textContent)) return
              editPost.mutate({
                postId: post.id,
                newTextContent: serialize({ children: textContent })
              })
            }}
            disabled={textContentEmpty(textContent)}
            className="ml-auto h-9 bg-blue-600 rounded-full px-6 cursor-pointer text-sm font-medium inline-flex items-center disabled:opacity-50"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  )
}
