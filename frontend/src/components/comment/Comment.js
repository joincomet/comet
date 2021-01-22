import {
  FiCornerUpLeft,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash,
  FiAlertCircle,
  FiShield
} from 'react-icons/fi'
import { BiRocket } from 'react-icons/bi'
import { TiPinOutline } from 'react-icons/ti'
import { HiDotsHorizontal, HiReply } from 'react-icons/hi'
import React, { useState } from 'react'
import UserAvatar from '@/components/user/UserAvatar'
import UserPopup from '@/components/user/UserPopup'
import Twemoji from 'react-twemoji'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import {
  useDeleteCommentMutation,
  useRocketCommentMutation,
  useUnrocketCommentMutation
} from '@/lib/mutations/commentMutations'
import { useLoginStore } from '@/lib/stores/useLoginStore'
import {
  useBanAndPurgeUserMutation,
  useBanUserFromPlanetMutation,
  useBanUserMutation,
  useRemoveCommentMutation,
  useReportCommentMutation
} from '@/lib/mutations/moderationMutations'
import { Menu, Transition } from '@headlessui/react'
import { menuTransition } from '@/lib/menuTransition'
import Tippy from '@tippyjs/react'
import toast from 'react-hot-toast'
import { useCommentStore } from '@/lib/stores/useCommentStore'
import EditCommentModal from '@/components/comment/EditCommentModal'
import {
  useRocketPostMutation,
  useUnrocketPostMutation
} from '@/lib/mutations/postMutations'
import { RiRocketFill } from 'react-icons/ri'

export default function Comment({
  commentData,
  post,
  level = 0,
  setParentComment
}) {
  const { setCreateComment } = useCommentStore()
  const [collapse, setCollapse] = useState(false)
  const [editing, setEditing] = useState(false)
  const [comment, setComment] = useState(commentData)
  const [textContent, setTextContent] = useState(comment.textContent)
  const currentUser = useCurrentUser().data
  const { setLogin } = useLoginStore()

  return (
    <>
      <EditCommentModal
        open={editing}
        setOpen={setEditing}
        comment={comment}
        setText={setTextContent}
      />
      <div className={`relative`}>
        <div id={comment.id36} />

        <div
          className="commentcollapse"
          style={{ marginLeft: 1 * level + 'rem' }}
          onClick={() => setCollapse(!collapse)}
        />

        <div
          className="relative transition dark:hover:bg-gray-775"
          style={{ paddingLeft: 1 * level + 'rem' }}
        >
          <div className="pl-4">
            <div className="pl-4 pr-8 py-2 transition dark:hover:bg-gray-775">
              <div
                onClick={
                  collapse
                    ? () => {
                        setCollapse(false)
                      }
                    : () => {}
                }
                className={`transition w-full ${
                  collapse ? 'opacity-50 hover:opacity-100 cursor-pointer' : ''
                } ${collapse || comment.deleted ? 'h-10' : ''}`}
              >
                <div className="flex items-center text-13 font-medium pb-1 text-tertiary">
                  <UserAvatar
                    className="w-5 h-5 mr-1.5 cursor-pointer transition hover:opacity-90"
                    user={comment.author}
                    loading="lazy"
                  />
                  <span className="hover:underline cursor-pointer">
                    {comment.author.username}
                  </span>
                  &nbsp;&middot;&nbsp;
                  <Tippy content={comment.timeSinceFull}>
                    <span>{comment.timeSince}</span>
                  </Tippy>
                </div>

                {!collapse && !comment.deleted && (
                  <>
                    <Twemoji options={{ className: 'twemoji' }}>
                      <div
                        className="prose prose-sm dark:prose-dark max-w-none"
                        dangerouslySetInnerHTML={{ __html: textContent }}
                      />
                    </Twemoji>

                    <div className="flex items-center space-x-1 pt-1">
                      <Rocket comment={comment} setComment={setComment} />

                      {!comment.deleted && (
                        <div
                          onClick={() => {
                            if (currentUser) {
                              setParentComment(comment)
                              setCreateComment(true)
                            } else {
                              setLogin(true)
                            }
                          }}
                          className="flex text-tertiary items-center transition rounded-md dark:hover:bg-gray-700 cursor-pointer select-none"
                        >
                          <div className="text-xs font-medium">Reply</div>
                          <HiReply className="w-5 h-5 ml-3" />
                        </div>
                      )}

                      <Options comment={comment} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {!collapse &&
          comment.childComments &&
          comment.childComments.length > 0 &&
          comment.childComments.map(childComment => (
            <Comment
              key={childComment.id}
              commentData={childComment}
              level={level + 1}
              setParentComment={setParentComment}
              post={post}
            />
          ))}
      </div>
    </>
  )
}

function Options({ comment }) {
  return (
    <div className="inline-flex cursor-pointer items-center text-mid p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
      <HiDotsHorizontal className="w-5 h-5" />
    </div>
  )
}

function Rocket({ comment, setComment }) {
  const { setLogin } = useLoginStore()
  const variables = { commentId: comment.id }
  const rocketCommentMutation = useRocketCommentMutation()
  const unrocketCommentMutation = useUnrocketCommentMutation()

  const rocket = async () => {
    comment.isRocketed = true
    comment.rocketCount++
    await rocketCommentMutation.mutateAsync(variables)
  }

  const unrocket = async () => {
    comment.isRocketed = false
    comment.rocketCount--
    await unrocketCommentMutation.mutateAsync(variables)
  }

  const currentUser = useCurrentUser().data

  const toggleRocket = () => {
    if (!currentUser) {
      setLogin(true)
      return
    }

    if (comment.isRocketed) unrocket()
    else rocket()
  }

  return (
    <div
      onClick={e => {
        e.stopPropagation()
        toggleRocket()
      }}
      className={`flex items-center px-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition ${
        comment.isRocketed ? 'text-red-400' : 'text-tertiary'
      }`}
    >
      <RiRocketFill className="w-4 h-4" />
      <div className="ml-1.5 text-xs font-medium">{comment.rocketCount}</div>
    </div>
  )
}

function MoreOptionsComment({ comment, post, level, setEditing }) {
  const menuItem =
    'cursor-pointer transition flex items-center w-full px-4 py-2.5 text-sm font-medium text-left focus:outline-none select-none'

  const currentUser = useCurrentUser().data

  const deleteComment = useDeleteCommentMutation()
  const removeComment = useRemoveCommentMutation()
  const banUserFromPlanet = useBanUserFromPlanetMutation()
  const banUser = useBanUserMutation()
  const banAndPurgeUser = useBanAndPurgeUserMutation()
  const reportComment = useReportCommentMutation()

  const isModerator =
    currentUser &&
    post.planet &&
    currentUser.moderatedPlanets &&
    currentUser.moderatedPlanets.map(p => p.id).includes(post.planet.id)

  return (
    <div className="relative inline-block z-30 h-full">
      <Menu>
        {({ open }) => (
          <>
            <span
              className={`cursor-pointer select-none text-disabled mr-3 h-full inline-flex items-center`}
              onClick={e => e.stopPropagation()}
            >
              <Menu.Button
                className={`transition rounded-full h-8 w-8 dark:hover:bg-gray-800 focus:outline-none inline-flex items-center justify-center`}
              >
                <FiMoreHorizontal size={18} />
              </Menu.Button>
            </span>

            <Transition show={open} {...menuTransition}>
              <Menu.Items
                static
                className="absolute right-full w-56 origin-top-right bg-white border border-gray-200 dark:border-transparent dark:bg-gray-800 rounded-md shadow-lg outline-none"
              >
                {currentUser &&
                  (isModerator ||
                    currentUser.admin ||
                    post.author.isCurrentUser) &&
                  level === 0 && (
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={e => {
                            e.stopPropagation()
                          }}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } text-accent ${menuItem}`}
                        >
                          <TiPinOutline
                            size={22}
                            style={{ marginTop: '-1px' }}
                            className="mr-4"
                          />
                          {comment.pinned ? `Unpin comment` : `Pin comment`}
                        </div>
                      )}
                    </Menu.Item>
                  )}

                {comment.author.isCurrentUser ? (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => setEditing(true)}
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
                            comment.deleted = true
                            deleteComment.mutateAsync({ commentId: comment.id })
                            toast.success('Deleted comment!')
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
                          reportComment.mutateAsync({
                            commentId: comment.id,
                            reason
                          })
                          toast.success('Reported comment!')
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
                  !comment.author.isCurrentUser &&
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
                              comment.removed = true
                              comment.removedReason = reason
                              removeComment.mutateAsync({
                                commentId: comment.id,
                                planetId: post.planet.id,
                                reason
                              })
                              toast.success('Removed comment!')
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
                                const reason = window.prompt('Reason for ban:')
                                if (!reason) return
                                banUserFromPlanet.mutateAsync({
                                  planetId: post.planet.id,
                                  bannedId: comment.author.id,
                                  reason
                                })
                                toast.success(
                                  `Banned @${comment.author.username} from +${post.planet.name}!`
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
                              Ban @{comment.author.username} from +
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
                                bannedId: comment.author.id,
                                reason
                              })
                              toast.success(
                                `Banned @${comment.author.username} from CometX!`
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
                            Ban @{comment.author.username} from CometX
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
                                  `Confirm ban and purge - will remove all posts by ${comment.author.username}`
                                )
                              )
                                return
                              banAndPurgeUser.mutateAsync({
                                bannedId: comment.author.id,
                                reason
                              })
                              toast.success(
                                `Banned and purged @${comment.author.username}!`
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
                            Ban @{comment.author.username} from CometX and purge
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
  )
}
