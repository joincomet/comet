import { FiX } from 'react-icons/fi'
import { Modal } from 'react-responsive-modal'
import React from 'react'
import CreatePlanetForm from '@/components/modals/createplanet/CreatePlanetForm'

export default function CreatePlanetModal({ open, setOpen }) {
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
      <CreatePlanetForm setOpen={setOpen} />
    </Modal>
  )
}
