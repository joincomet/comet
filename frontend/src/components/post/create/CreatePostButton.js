import { FiEdit } from 'react-icons/fi'
import React, { useState } from 'react'
import CreatePostModal from '@/components/post/create/CreatePostModal'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useLoginStore } from '@/lib/stores/useLoginStore'

export default function CreatePostButton() {
  const currentUser = useCurrentUser().data
  const [open, setOpen] = useState(false)
  const { setLogin } = useLoginStore()

  return (
    <>
      <CreatePostModal open={open} setOpen={setOpen} />

      <div className="fixed z-50 bottom-20 lg:bottom-8 left-0 lg:left-64 right-0 mycontainer grid grid-cols-3 pointer-events-none">
        <div className="col-span-3 lg:col-span-2 flex">
          <div
            onClick={() => {
              if (currentUser) setOpen(true)
              else setLogin(true)
            }}
            className="pointer-events-auto text-white opacity-90 hover:opacity-100 rounded-full shadow-md bg-blue-600 mx-auto h-8 w-48 flex items-center justify-center label cursor-pointer transition transform hover:scale-105"
          >
            Create Post
            <FiEdit size={16} className="ml-3" />
          </div>
        </div>
      </div>
    </>
  )
}
