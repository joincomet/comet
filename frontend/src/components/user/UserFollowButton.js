import { FiMoreHorizontal } from 'react-icons/fi'
import React from 'react'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import {
  useJoinPlanetMutation,
  useLeavePlanetMutation
} from '@/lib/mutations/joinPlanetMutations'
import { useRouter } from 'next/router'
import { useLogin } from '@/lib/useLogin'
import {
  useFollowUserMutation,
  useUnfollowUserMutation
} from '@/lib/mutations/followMutations'

export default function UserFollowButton({ user }) {
  const currentUser = useCurrentUser().data
  const { openLogin } = useLogin()

  const followMutation = useFollowUserMutation()
  const unfollowMutation = useUnfollowUserMutation()

  const toggle = () => {
    if (!currentUser) {
      openLogin()
      return
    }
    if (user.isFollowing) unfollow()
    else follow()
  }

  const variables = { followedId: user.id }

  const follow = async () => {
    user.isFollowing = true
    user.followerCount++
    await followMutation.mutateAsync(variables)
  }

  const unfollow = async () => {
    user.isFollowing = false
    user.followerCount--
    await unfollowMutation.mutateAsync(variables)
  }

  return (
    <div className="inline-flex items-center">
      <div
        onClick={() => toggle()}
        className={`h-8 rounded-full inline-flex w-32 items-center justify-center label cursor-pointer transition transform hover:scale-105 ${
          user.isFollowing
            ? 'bg-black bg-opacity-25 border border-gray-500 text-blue-500'
            : 'bg-blue-600'
        }`}
      >
        {user.isFollowing ? 'Following' : 'Follow'}
      </div>

      <div className="ml-4 w-8 h-8 rounded-full border border-gray-500 bg-black bg-opacity-25 inline-flex items-center justify-center cursor-pointer transition transform hover:scale-105">
        <FiMoreHorizontal size={20} />
      </div>
    </div>
  )
}
