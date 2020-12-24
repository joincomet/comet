import { FiMoreHorizontal } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useLogin } from '@/lib/useLogin'
import {
  useFollowUserMutation,
  useUnfollowUserMutation
} from '@/lib/mutations/userMutations'
import { useUploadBannerMutation } from '@/lib/mutations/editProfileMutations'
import { useUser } from '@/lib/queries/useUser'

export default function UserFollowButton({ user }) {
  const userQuery = useUser({ username: user.username })
  const currentUserQuery = useCurrentUser()
  const currentUser = currentUserQuery.data
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

  const [bannerImage, setBannerImage] = useState(null)

  const uploadBanner = useUploadBannerMutation()

  useEffect(() => {
    if (!bannerImage || bannerImage.length === 0) return
    uploadBanner.mutateAsync({ file: bannerImage[0] }).then(bannerUrl => {
      user.bannerUrl = bannerUrl
      userQuery.refetch()
      currentUserQuery.refetch()
    })
  }, [bannerImage])

  return (
    <div className="inline-flex items-center">
      {user.isCurrentUser ? (
        <div>
          <input
            name="bannerImage"
            id="bannerImage"
            className="hidden"
            accept="image/png, image/jpeg"
            type="file"
            onChange={e => setBannerImage(e.target.files)}
          />
          <label
            htmlFor="bannerImage"
            className="block h-8 rounded-full inline-flex px-6 items-center justify-center label cursor-pointer transition transform hover:scale-105 bg-black bg-opacity-25 border border-gray-500 text-blue-500"
          >
            Upload Banner
          </label>
        </div>
      ) : (
        <>
          <div
            onClick={() => toggle()}
            className={`h-8 rounded-full inline-flex px-6 items-center justify-center label cursor-pointer transition transform hover:scale-105 ${
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
        </>
      )}
    </div>
  )
}
