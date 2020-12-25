import { FiMoreHorizontal } from 'react-icons/fi'
import React from 'react'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import {
  useJoinPlanetMutation,
  useLeavePlanetMutation
} from '@/lib/mutations/planetMutations'
import { useLoginStore } from '@/lib/stores/useLoginStore'

export default function PlanetJoinButton({ planet }) {
  const currentUser = useCurrentUser().data
  const { setLogin } = useLoginStore()

  const joinMutation = useJoinPlanetMutation()
  const leaveMutation = useLeavePlanetMutation()

  const toggle = () => {
    if (!currentUser) {
      setLogin(true)
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
            ? 'bg-black bg-opacity-25 border border-gray-500 text-white dark:text-blue-500'
            : 'bg-blue-600 text-white'
        }`}
      >
        {planet.isJoined ? 'Joined' : 'Join'}
      </div>
    </div>
  )
}
