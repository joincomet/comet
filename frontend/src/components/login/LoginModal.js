import { FiX } from 'react-icons/fi'
import LoginForm from '@/components/login/LoginForm'
import { Modal } from 'react-responsive-modal'
import React from 'react'
import { useLoginStore } from '@/lib/stores'

export default function LoginModal() {
  const { open, closeLoginModal } = useLoginStore()

  return (
    <Modal
      open={open}
      onClose={() => closeLoginModal()}
      classNames={{
        modal:
          'overflow-hidden bg-transparent shadow-none max-w-screen-sm w-full',
        closeButton: 'top-8 right-8 text-tertiary focus:outline-none',
        overlay: 'bg-black bg-opacity-75'
      }}
      animationDuration={150}
      center
      blockScroll={false}
      closeIcon={<FiX size={20} />}
    >
      <LoginForm onFinish={() => closeLoginModal()} />
    </Modal>
  )
}
