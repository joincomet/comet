import { FiMoreHorizontal } from 'react-icons/fi'
import React from 'react'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import {
  useJoinPlanetMutation,
  useLeavePlanetMutation
} from '@/lib/mutations/joinPlanetMutations'
import { useRouter } from 'next/router'
import { useLogin } from '@/lib/useLogin'

export default function PlanetJoinButton({ planet }) {
  const currentUser = useCurrentUser().data
  const { openLogin } = useLogin()

  const joinMutation = useJoinPlanetMutation()
  const leaveMutation = useLeavePlanetMutation()

  const toggle = () => {
    if (!currentUser) {
      openLogin()
      return
    }
    if (planet.isJoined) leave()
    else join()
  }

  const variables = { planetId: planet.id }

  const join = async () => {
    planet.isJoined = true
    planet.userCount++
    await joinMutation.mutateAsync(variables)
  }

  const leave = async () => {
    planet.isJoined = false
    planet.userCount--
    await leaveMutation.mutateAsync(variables)
  }

  return (
    <div className="inline-flex items-center">
      <div
        onClick={() => toggle()}
        className={`h-8 rounded-full inline-flex w-32 items-center justify-center label cursor-pointer transition transform hover:scale-105 ${
          planet.isJoined
            ? 'bg-black bg-opacity-25 border border-gray-500 text-blue-500'
            : 'bg-blue-600'
        }`}
      >
        {planet.isJoined ? 'Joined' : 'Join'}
      </div>

      <div className="ml-4 w-8 h-8 rounded-full border border-gray-500 bg-black bg-opacity-25 inline-flex items-center justify-center cursor-pointer transition transform hover:scale-105">
        <FiMoreHorizontal size={20} />
      </div>
    </div>
  )
}
