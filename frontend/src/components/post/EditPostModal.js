import { FiX } from 'react-icons/fi'
import { Modal } from 'react-responsive-modal'
import React, { useEffect, useState } from 'react'
import Editor from '@/components/Editor'
import { emptyEditor } from '@/lib/emptyEditor'
import { deserialize, serialize, textContentEmpty } from '@/lib/serializeHtml'
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
  const [textContent, setTextContent] = useState(emptyEditor)

  useEffect(() => {
    if (!post.textContent) return
    setTextContent(
      deserialize(
        new DOMParser().parseFromString(post.textContent, 'text/html').body
      )
    )
  }, [])

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
