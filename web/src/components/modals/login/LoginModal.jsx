import { FiX } from 'react-icons/fi'
import LoginForm from '@/components/modals/login/LoginForm'
import { Modal } from 'react-responsive-modal'
import React from 'react'
import { useRouter } from 'next/router'
import { useLoginStore } from 'core/stores/useLoginStore'

export default function LoginModal() {
  const { query, pathname, push } = useRouter()

  const { login, setLogin } = useLoginStore()

  return (
    <Modal
      open={login}
      onClose={() => setLogin(false)}
      onOverlayClick={e => {
        e.stopPropagation()
        setLogin(false)
      }}
      animationDuration={150}
      center
      blockScroll={false}
      closeIcon={<FiX size={20} />}
    >
      <LoginForm
        onFinish={() => {
          setLogin(false)
          window.scrollTo(0, 0)
        }}
      />
    </Modal>
  )
}
