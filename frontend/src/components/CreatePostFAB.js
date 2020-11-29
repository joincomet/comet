import { FiEdit } from 'react-icons/fi'
import React from 'react'

export default function CreatePostFAB() {
  return (
    <div className="fixed w-14 h-14 rounded-full bg-blue-500 shadow-md inline-flex right-4 bottom-20 z-10 cursor-pointer transition hover:bg-blue-600">
      <FiEdit size={20} className="m-auto text-white" />
    </div>
  )
}
