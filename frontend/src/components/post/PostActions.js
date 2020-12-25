import { BiRocket } from 'react-icons/bi'
import {
  FiMessageCircle,
  FiMoreHorizontal,
  FiTrash,
  FiAlertCircle,
  FiEdit2,
  FiShield
} from 'react-icons/fi'
import { FaThumbtack } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import {
  useDeletePostMutation,
  usePinPostMutation,
  usePinPostProfileMutation,
  useRocketPostMutation,
  useUnpinPostMutation,
  useUnpinPostProfileMutation,
  useUnrocketPostMutation
} from '@/lib/mutations/postMutations'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useLoginStore } from '@/lib/stores/useLoginStore'
import { Menu, Transition } from '@headlessui/react'
import { menuTransition } from '@/lib/menuTransition'
import {
  useBanAndPurgeUserMutation,
  useBanUserFromPlanetMutation,
  useBanUserMutation,
  useRemovePostMutation,
  useReportPostMutation
} from '@/lib/mutations/moderationMutations'
import Tippy from '@tippyjs/react'
import toast from 'react-hot-toast'
import EditPostModal from '@/components/post/EditPostModal'

const chip =
  'cursor-pointer inline-flex items-center group transition select-none'
const label = 'ml-0.5 label transition'
const icon =
  'w-9 h-9 dark:group-hover:bg-gray-800 rounded-full transition inline-flex items-center justify-center focus:outline-none'

export default function PostActions({ post, textContent, setTextContent }) {
  const currentUser = useCurrentUser().data
  const { setLogin } = useLoginStore()

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
      setLogin(true)
      return
    }

    if (post.isRocketed) unrocket()
    else rocket()
  }

  const isModerator =
    currentUser &&
    post.planet &&
    currentUser.moderatedPlanets &&
    currentUser.moderatedPlanets.map(p => p.id).includes(post.planet.id)

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

      <div className={`${chip} text-mid`}>
        <div className={`${icon} group-hover:text-blue-500`}>
          <FiMessageCircle size={18} />
        </div>
        <span className={`${label} group-hover:text-blue-500`}>
          {post.commentCount}
        </span>
      </div>

      <div className="mr-auto" />

      {(post.pinned || post.pinnedByAuthor) && (
        <Tippy
          content={`Pinned to ${
            post.pinned && !post.pinnedByAuthor ? `+${post.planet.name}` : ''
          }${
            !post.pinned && post.pinnedByAuthor
              ? `@${post.author.username}`
              : ''
          }${
            post.pinned && post.pinnedByAuthor
              ? `+${post.planet.name} and @${post.author.username}`
              : ''
          }`}
        >
          <div className="text-accent mr-4 cursor-pointer">
            <FaThumbtack size={18} className="transform -rotate-45" />
          </div>
        </Tippy>
      )}

      {isModerator && (
        <Tippy content={`You are a moderator of +${post.planet.name}`}>
          <div className="text-green-500 mr-4 cursor-pointer">
            <FiShield size={18} />
          </div>
        </Tippy>
      )}

      <MoreOptions
        post={post}
        chip={chip}
        icon={icon}
        isModerator={isModerator}
        textContent={textContent}
        setTextContent={setTextContent}
      />
    </div>
  )
}

function MoreOptions({
  post,
  chip,
  icon,
  isModerator,
  textContent,
  setTextContent
}) {
  const menuItem =
    'cursor-pointer transition flex items-center w-full px-4 py-2.5 text-sm font-medium text-left focus:outline-none select-none'

  const currentUser = useCurrentUser().data

  const pinPost = usePinPostMutation()
  const unpinPost = useUnpinPostMutation()
  const pinProfile = usePinPostProfileMutation()
  const unpinProfile = useUnpinPostProfileMutation()
  const deletePost = useDeletePostMutation()
  const removePost = useRemovePostMutation()
  const banUserFromPlanet = useBanUserFromPlanetMutation()
  const banUser = useBanUserMutation()
  const banAndPurgeUser = useBanAndPurgeUserMutation()
  const reportPost = useReportPostMutation()
  const [editing, setEditing] = useState(false)

  return (
    <>
      <EditPostModal
        post={post}
        setText={setTextContent}
        setOpen={setEditing}
        open={editing}
      />

      <div className="relative inline-block z-30">
        <Menu>
          {({ open }) => (
            <>
              <span
                className={`${chip} text-disabled`}
                onClick={e => e.stopPropagation()}
              >
                <Menu.Button className={`${icon} z-0`}>
                  <FiMoreHorizontal size={18} />
                </Menu.Button>
              </span>

              <Transition show={open} {...menuTransition}>
                <Menu.Items
                  static
                  className="absolute right-full w-56 origin-top-right bg-white border border-gray-200 dark:border-transparent dark:bg-gray-800 rounded-md shadow-lg outline-none"
                >
                  {currentUser &&
                    post.planet &&
                    (isModerator || currentUser.admin) && (
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={e => {
                              e.stopPropagation()
                              if (!post.pinned) {
                                post.pinned = true
                                pinPost.mutateAsync({
                                  postId: post.id,
                                  planetId: post.planet.id
                                })
                                toast.success(
                                  `Pinned post to +${post.planet.name}`
                                )
                              } else {
                                post.pinned = false
                                unpinPost.mutateAsync({
                                  postId: post.id,
                                  planetId: post.planet.id
                                })
                                toast.success(
                                  `Unpinned post from +${post.planet.name}`
                                )
                              }
                            }}
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-700' : ''
                            } text-accent ${menuItem}`}
                          >
                            <FaThumbtack
                              size={18}
                              className="mr-4 transform -rotate-45"
                            />
                            {post.pinned
                              ? `Unpin from +${post.planet.name}`
                              : `Pin to +${post.planet.name}`}
                          </div>
                        )}
                      </Menu.Item>
                    )}

                  {post.author.isCurrentUser ? (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={e => {
                              e.stopPropagation()
                              if (!post.pinnedByAuthor) {
                                post.pinnedByAuthor = true
                                pinProfile.mutateAsync({ postId: post.id })
                                toast.success(
                                  `Pinned post to @${post.author.username}`
                                )
                              } else {
                                post.pinnedByAuthor = false
                                unpinProfile.mutateAsync({ postId: post.id })
                                toast.success(
                                  `Unpinned post from @${post.author.username}`
                                )
                              }
                            }}
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-700' : ''
                            } text-accent ${menuItem}`}
                          >
                            <FaThumbtack
                              size={18}
                              className="mr-4 transform -rotate-45"
                            />
                            {post.pinnedByAuthor
                              ? 'Unpin from profile'
                              : 'Pin to profile'}
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={e => {
                              e.stopPropagation()
                              setEditing(true)
                            }}
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-700' : ''
                            } text-tertiary ${menuItem}`}
                          >
                            <FiEdit2 size={18} className="mr-4" />
                            Edit
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={e => {
                              e.stopPropagation()
                              if (!window.confirm('Confirm Delete')) return
                              post.deleted = true
                              deletePost.mutateAsync({ postId: post.id })
                              toast.success(`Deleted post!`)
                            }}
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-700' : ''
                            } text-red-400 ${menuItem}`}
                          >
                            <FiTrash size={18} className="mr-4" />
                            Delete
                          </div>
                        )}
                      </Menu.Item>
                    </>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={e => {
                            e.stopPropagation()
                            const reason = window.prompt('Reason for removal:')
                            if (!reason) return
                            reportPost.mutateAsync({ postId: post.id, reason })
                            toast.success('Reported post!')
                          }}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } text-red-400 ${menuItem}`}
                        >
                          <FiAlertCircle size={18} className="mr-4" />
                          Report
                        </div>
                      )}
                    </Menu.Item>
                  )}

                  {currentUser &&
                    !post.author.isCurrentUser &&
                    (currentUser.admin || isModerator) && (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={e => {
                                e.stopPropagation()
                                const reason = window.prompt(
                                  'Reason for removal:'
                                )
                                if (!reason) return
                                post.removed = true
                                post.removedReason = reason
                                removePost.mutateAsync({
                                  postId: post.id,
                                  planetId: post.planet ? post.planet.id : null,
                                  reason
                                })
                                toast.success(`Removed post!`)
                              }}
                              className={`${
                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } text-red-400 ${menuItem}`}
                            >
                              <FiShield size={18} className="mr-4" />
                              Remove
                            </div>
                          )}
                        </Menu.Item>

                        {post.planet && (
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={e => {
                                  e.stopPropagation()
                                  const reason = window.prompt(
                                    'Reason for ban:'
                                  )
                                  if (!reason) return
                                  banUserFromPlanet.mutateAsync({
                                    planetId: post.planet.id,
                                    bannedId: post.author.id,
                                    reason
                                  })
                                  toast.success(
                                    `Banned @${post.author.username} from +${post.planet.name}!`
                                  )
                                }}
                                className={`${
                                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } text-red-400 ${menuItem}`}
                              >
                                <FiShield
                                  size={18}
                                  className="mr-4 flex-shrink-0"
                                />
                                Ban @{post.author.username} from +
                                {post.planet.name}
                              </div>
                            )}
                          </Menu.Item>
                        )}
                      </>
                    )}

                  {currentUser &&
                    currentUser.admin &&
                    !post.author.isCurrentUser && (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={e => {
                                e.stopPropagation()
                                const reason = window.prompt('Reason for ban:')
                                if (!reason) return
                                banUser.mutateAsync({
                                  bannedId: post.author.id,
                                  reason
                                })
                                toast.success(
                                  `Banned @${post.author.username} from CometX!`
                                )
                              }}
                              className={`${
                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } text-red-400 ${menuItem}`}
                            >
                              <FiShield
                                size={18}
                                className="mr-4 flex-shrink-0"
                              />
                              Ban @{post.author.username} from CometX
                            </div>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={e => {
                                e.stopPropagation()
                                const reason = window.prompt(
                                  'Reason for ban and purge:'
                                )
                                if (!reason) return
                                if (
                                  !window.confirm(
                                    `Confirm ban and purge - will remove all posts by ${post.author.username}`
                                  )
                                )
                                  return
                                banAndPurgeUser.mutateAsync({
                                  bannedId: post.author.id,
                                  reason
                                })
                                toast.success(
                                  `Banned and purged @${post.author.username}!`
                                )
                              }}
                              className={`${
                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } text-red-400 ${menuItem}`}
                            >
                              <FiShield
                                size={18}
                                className="mr-4 flex-shrink-0"
                              />
                              Ban @{post.author.username} from CometX and purge
                              posts
                            </div>
                          )}
                        </Menu.Item>
                      </>
                    )}
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </>
  )
}
