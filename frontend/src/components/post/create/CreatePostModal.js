import { FiX } from 'react-icons/fi'
import { Modal } from 'react-responsive-modal'
import React from 'react'
import CreatePostForm from '@/components/post/create/CreatePostForm'

export default function CreatePostModal({ open, setOpen }) {
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
      <CreatePostForm setOpen={setOpen} />
    </Modal>
  )
}
