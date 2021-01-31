import { FiMessageCircle } from 'react-icons/fi'
import React from 'react'
import { useCurrentUser } from '@comet/corequeries/useCurrentUser'
import CreateCommentModal from '@/components/modals/createcomment/CreateCommentModal'
import { useLoginStore } from '@comet/corestores/useLoginStore'
import { useCommentStore } from '../../../lib/stores/useCommentStore'

export default function CreateCommentButton({
  post,
  parentComment,
  setParentComment,
  commentVariables
}) {
  const currentUser = useCurrentUser().data
  const { setLogin } = useLoginStore()
  const { setCreateComment } = useCommentStore()

  return (
    <>
      <CreateCommentModal
        commentVariables={commentVariables}
        post={post}
        parentComment={parentComment}
      />

      <div className="fixed z-50 bottom-20 lg:bottom-8 left-0 lg:left-64 right-0 mycontainer grid grid-cols-3 pointer-events-none">
        <div className="col-span-3 lg:col-span-2 flex">
          <div
            onClick={() => {
              if (currentUser) {
                setParentComment(null)
                setCreateComment(true)
              } else {
                setLogin(true)
              }
            }}
            className="pointer-events-auto text-white opacity-90 hover:opacity-100 rounded-full shadow-md bg-blue-600 mx-auto h-8 w-48 flex items-center justify-center label cursor-pointer transition transform hover:scale-105"
          >
            New Comment
            <FiMessageCircle size={16} className="ml-3" />
          </div>
        </div>
      </div>
    </>
  )
}
