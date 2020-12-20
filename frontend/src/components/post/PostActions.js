import { BiRocket } from 'react-icons/bi'
import { FiMessageCircle, FiShare } from 'react-icons/fi'
import React from 'react'
import {
  useRocketPostMutation,
  useUnrocketPostMutation
} from '@/lib/mutations/rocketMutations'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useLogin } from '@/lib/useLogin'

const chip = 'cursor-pointer inline-flex items-center group transition'
const label = 'ml-0.5 text-sm font-medium transition'
const icon =
  'w-9 h-9 dark:group-hover:bg-gray-800 rounded-full transition inline-flex items-center justify-center'

export default function PostActions({ post }) {
  const currentUser = useCurrentUser().data
  const { openLogin } = useLogin()

  const rocketPostMutation = useRocketPostMutation()
  const unrocketPostMutation = useUnrocketPostMutation()

  const variables = { postId: post.id }

  const rocket = async () => {
    post.isRocketed = true
    post.rocketCount++
    await rocketPostMutation.mutateAsync(variables)
  }

  const unrocket = async () => {
    post.isRocketed = false
    post.rocketCount--
    await unrocketPostMutation.mutateAsync(variables)
  }

  const toggle = () => {
    if (!currentUser) {
      openLogin()
      return
    }

    if (post.isRocketed) unrocket()
    else rocket()
  }

  return (
    <div className={`flex flex-row items-center pt-1`}>
      <div
        className={`${chip} mr-6 ${
          post.isRocketed ? 'text-red-400' : 'text-tertiary'
        }`}
        onClick={e => {
          e.stopPropagation()
          toggle()
        }}
      >
        <div className={`${icon} group-hover:text-red-400`}>
          <BiRocket size={18} />
        </div>
        <span className={`${label} group-hover:text-red-400`}>
          {post.rocketCount}
        </span>
      </div>

      <div className={`${chip} mr-6 text-tertiary`}>
        <div className={`${icon} group-hover:text-blue-500`}>
          <FiMessageCircle size={18} />
        </div>
        <span className={`${label} group-hover:text-blue-500`}>
          {post.commentCount}
        </span>
      </div>

      <div
        className={`${chip} ml-auto text-tertiary`}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <div className={`${icon} group-hover:text-blue-500`}>
          <FiShare size={18} />
        </div>
      </div>
    </div>
  )
}
