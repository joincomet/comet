import { FiMessageCircle } from 'react-icons/fi'
import React from 'react'
import { useRouter } from 'next/router'
import NavLink from '@/components/NavLink'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import CreateCommentModal from '@/components/createcomment/CreateCommentModal'

export default function CreateCommentButton({
  post,
  parentComment,
  setParentComment
}) {
  const currentUser = useCurrentUser().data
  const { query, pathname, push } = useRouter()

  return (
    <>
      <CreateCommentModal post={post} parentComment={parentComment} />

      <div className="fixed z-50 bottom-20 md:bottom-8 left-0 md:left-64 right-0 mycontainer grid grid-cols-3 pointer-events-none">
        <div className="col-span-3 md:col-span-2 flex">
          <div
            onClick={() => {
              setParentComment(null)
              push({
                pathname,
                query: currentUser
                  ? { ...query, createcomment: 'true' }
                  : { ...query, login: 'true' }
              })
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
