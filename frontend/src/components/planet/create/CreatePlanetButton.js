import { FiMessageCircle } from 'react-icons/fi'
import React, { useState } from 'react'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useLoginStore } from '@/lib/stores/useLoginStore'
import CreatePlanetModal from '@/components/planet/create/CreatePlanetModal'
import toast from 'react-hot-toast'

export default function CreatePlanetButton({ className = '' }) {
  const currentUser = useCurrentUser().data
  const [open, setOpen] = useState(false)
  const { setLogin } = useLoginStore()

  return (
    <>
      <CreatePlanetModal open={open} setOpen={setOpen} />

      <div
        onClick={() => {
          if (currentUser) {
            if (currentUser.moderatedPlanets.length >= 5 && !currentUser.admin)
              toast.error('You cannot moderate more than 5 planets')
            else setOpen(true)
          } else {
            setLogin(true)
          }
        }}
        className={className}
      >
        <svg className="w-5 h-5 mr-6" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17 14H19V17H22V19H19V22H17V19H14V17H17V14M20 12C20 8.64 17.93 5.77 15 4.59V5C15 6.1 14.1 7 13 7H11V9C11 9.55 10.55 10 10 10H8V12H14C14.5 12 14.9 12.35 15 12.81C13.2 13.85 12 15.79 12 18C12 19.5 12.54 20.85 13.44 21.9L12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12L21.9 13.44C21.34 12.96 20.7 12.59 20 12.34L20 12M11 19.93V18C9.9 18 9 17.1 9 16V15L4.21 10.21C4.08 10.78 4 11.38 4 12C4 16.08 7.06 19.44 11 19.93Z"
          />
        </svg>
        Create a Planet
      </div>
    </>
  )
}
