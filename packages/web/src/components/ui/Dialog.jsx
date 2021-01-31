import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal'

export default function Dialog({ children, activator }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      {activator && activator({ open, setOpen })}

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
        closeIcon={<></>}
      >
        {children({ open, setOpen })}
      </Modal>
    </>
  )
}
