import { BiRocket } from 'react-icons/bi'
import { FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi'
import React from 'react'
import {
  useRocketPostMutation,
  useUnrocketPostMutation
} from '@/lib/mutations/rocketMutations'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useLogin } from '@/lib/useLogin'
import { Menu, Transition } from '@headlessui/react'
import { menuTransition } from '@/lib/menuTransition'

const chip = 'cursor-pointer inline-flex items-center group transition'
const label = 'ml-0.5 label transition'
const icon =
  'w-9 h-9 dark:group-hover:bg-gray-800 rounded-full transition inline-flex items-center justify-center focus:outline-none'

export default function PostActions({ post, showOptions = false }) {
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
          post.isRocketed ? 'text-red-400' : 'text-mid'
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

      <div className={`${chip} mr-auto text-mid`}>
        <div className={`${icon} group-hover:text-blue-500`}>
          <FiMessageCircle size={18} />
        </div>
        <span className={`${label} group-hover:text-blue-500`}>
          {post.commentCount}
        </span>
      </div>

      <MoreOptions post={post} chip={chip} icon={icon} />
    </div>
  )
}

function MoreOptions({ post, chip, icon }) {
  const menuItem =
    'cursor-pointer transition flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none'
  return (
    <div className="z-50 relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <span
              className={`${chip} text-disabled`}
              onClick={e => e.stopPropagation()}
            >
              <Menu.Button className={icon}>
                <FiMoreHorizontal size={18} />
              </Menu.Button>
            </span>

            <Transition show={open} {...menuTransition}>
              <Menu.Items
                static
                className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 dark:border-transparent dark:bg-gray-800 rounded-md shadow-lg outline-none"
              >
                {post.author.isCurrentUser ? (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } text-secondary ${menuItem}`}
                        >
                          Pin to profile
                        </div>
                      )}
                    </Menu.Item>
                    {post.textContent && (
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-700' : ''
                            } text-secondary ${menuItem}`}
                          >
                            Edit
                          </div>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } text-red-400 ${menuItem}`}
                        >
                          Delete
                        </div>
                      )}
                    </Menu.Item>
                  </>
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-gray-100 dark:bg-gray-700' : ''
                        } text-red-400 ${menuItem}`}
                      >
                        Report
                      </div>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}
