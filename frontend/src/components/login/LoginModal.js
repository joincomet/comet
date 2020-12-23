import { FiX } from 'react-icons/fi'
import LoginForm from '@/components/login/LoginForm'
import { Modal } from 'react-responsive-modal'
import React from 'react'
import { useRouter } from 'next/router'

export default function LoginModal() {
  const { query, pathname, push } = useRouter()

  const close = () => {
    const q = { ...query }
    delete q.login
    push({ query: q, pathname })
  }

  return (
    <Modal
      open={query.login === 'true'}
      onClose={() => close()}
      onOverlayClick={e => {
        e.stopPropagation()
        close()
      }}
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
      <LoginForm
        onFinish={() => {
          close()
          window.scrollTo(0, 0)
        }}
      />
    </Modal>
  )
}
