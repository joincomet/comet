import { FiMoreHorizontal } from 'react-icons/fi'
import React from 'react'
import { useJoinPlanetMutation } from '@/lib/mutations/useJoinPlanetMutation'
import { useLeavePlanetMutation } from '@/lib/mutations/useLeavePlanetMutation'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useLoginStore } from '@/lib/stores'

export default function PlanetJoinButton({ planet }) {
  const currentUser = useCurrentUser().data

  const joinMutation = useJoinPlanetMutation()
  const leaveMutation = useLeavePlanetMutation()

  const { openLoginModal } = useLoginStore()

  const toggle = async () => {
    if (!currentUser) {
      openLoginModal()
    } else {
      if (planet.isJoined) await join()
      else await leave()
    }
  }

  const join = async () => {
    planet.isJoined = true
    await joinMutation.mutateAsync({ name: planet.name })
  }

  const leave = async () => {
    planet.isJoined = false
    await leaveMutation.mutateAsync({ name: planet.name })
  }

  return (
    <div className="inline-flex items-center">
      <div
        onClick={() => toggle()}
        className={`h-8 rounded-full inline-flex w-32 items-center justify-center uppercase text-xs font-semibold tracking-widest cursor-pointer transition transform hover:scale-105 ${
          planet.isJoined
            ? 'bg-black bg-opacity-25 border border-gray-400 text-blue-500'
            : 'bg-blue-600'
        }`}
      >
        {planet.isJoined ? 'Joined' : 'Join'}
      </div>

      <div className="ml-4 w-8 h-8 rounded-full border border-gray-400 bg-black bg-opacity-25 inline-flex items-center justify-center cursor-pointer transition transform hover:scale-105">
        <FiMoreHorizontal size={20} />
      </div>
    </div>
  )
}
