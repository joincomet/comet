import React, { useState } from 'react'

export default function Modal({ children, closeIcon }) {
  const [open, setOpen] = useState(false)
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
      closeIcon={closeIcon}
    >
      {children}
    </Modal>
  )
}
