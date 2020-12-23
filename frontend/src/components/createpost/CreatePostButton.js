import { FiEdit } from 'react-icons/fi'
import React from 'react'
import { useRouter } from 'next/router'
import NavLink from '@/components/NavLink'
import CreatePostModal from '@/components/createpost/CreatePostModal'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'

export default function CreatePostButton() {
  const currentUser = useCurrentUser().data
  const { query, pathname } = useRouter()

  return (
    <>
      <CreatePostModal />

      <div className="fixed z-50 bottom-20 md:bottom-8 left-0 md:left-64 right-0 mycontainer grid grid-cols-3 pointer-events-none">
        <div className="col-span-3 md:col-span-2 flex">
          <NavLink
            href={{
              pathname,
              query: currentUser
                ? { ...query, createpost: 'true' }
                : { ...query, login: 'true' }
            }}
            scroll={false}
            className="pointer-events-auto text-white opacity-90 hover:opacity-100 rounded-full shadow-md bg-blue-600 mx-auto h-8 w-48 flex items-center justify-center label cursor-pointer transition transform hover:scale-105"
          >
            Create Post
            <FiEdit size={16} className="ml-3" />
          </NavLink>
        </div>
      </div>
    </>
  )
}
