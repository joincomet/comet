import UserAvatar from '@/components/user/UserAvatar'
import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { usePopper } from 'react-popper'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import NavLink from '@/components/NavLink'
import { useLoginStore } from '@/lib/stores/useLoginStore'
import {
  useFollowUserMutation,
  useUnfollowUserMutation
} from '@/lib/mutations/userMutations'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'

export default function UserPopup({
  user,
  children,
  placement = 'right-start'
}) {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          mainAxis: true // true by default
        }
      }
    ]
  })

  const [show, setShow] = useState(false)

  const clickAwayRef = useRef(null)
  useClickAway(clickAwayRef, ({ target }) => {
    if (
      target !== referenceElement &&
      !referenceElement.contains(target) &&
      show
    )
      setShow(false)
  })

  const currentUser = useCurrentUser().data
  const { setLogin } = useLoginStore()

  const followMutation = useFollowUserMutation()
  const unfollowMutation = useUnfollowUserMutation()

  const toggle = () => {
    if (!currentUser) {
      setLogin(true)
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
    <>
      <div
        ref={setReferenceElement}
        onClick={e => {
          e.stopPropagation()
          setShow(!show)
        }}
        className="inline-block leading-none"
      >
        {children}
      </div>

      {show &&
        ReactDOM.createPortal(
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            onClick={e => e.stopPropagation()}
            className="z-50"
          >
            <AnimatePresence>
              {show && (
                <>
                  <motion.div
                    ref={clickAwayRef}
                    initial={{
                      x: 8
                    }}
                    animate={{
                      x: 0
                    }}
                    transition={{ duration: 0.15, ease: 'easeInOut' }}
                    className="relative border border-gray-200 dark:border-transparent bg-white dark:bg-gray-800 rounded-md shadow-xl p-3 flex flex-col items-center z-50 w-64"
                  >
                    <NavLink
                      className="w-20 h-20"
                      href={`/user/${user.username}`}
                    >
                      <UserAvatar user={user} className="w-20 h-20" />
                    </NavLink>

                    <NavLink
                      href={`/user/${user.username}`}
                      className="leading-none mt-3 font-medium"
                    >
                      {user.name}
                    </NavLink>

                    <NavLink
                      href={`/user/${user.username}`}
                      className="leading-none mt-1.5 font-medium text-xs text-tertiary"
                    >
                      @{user.username}
                    </NavLink>

                    <div className="mt-3 text-sm text-secondary font-medium text-center line-clamp-3">
                      {user.bio || 'New CometX User'}
                    </div>

                    <div className="flex text-sm space-x-4 mt-3 text-tertiary">
                      <div>
                        <span className="text-secondary font-bold">
                          {user.followerCount}
                        </span>{' '}
                        Follower
                        {user.followerCount === 1 ? '' : 's'}
                      </div>
                      <div>
                        <span className="text-secondary font-bold">
                          {user.followingCount}
                        </span>{' '}
                        Following
                      </div>
                    </div>

                    <div className="flex items-center mt-4 space-x-3 w-full">
                      <NavLink
                        href={`/user/${user.username}`}
                        className="text-accent border rounded dark:border-gray-700 w-full h-9 inline-flex items-center justify-center text-sm font-medium cursor-pointer"
                      >
                        View profile
                      </NavLink>

                      <div
                        onClick={() => {
                          if (!user.isCurrentUser) toggle()
                        }}
                        className={`text-white w-full h-9 rounded inline-flex items-center justify-center text-sm font-medium select-none ${
                          user.isCurrentUser ? 'opacity-25' : 'cursor-pointer'
                        } ${
                          user.isFollowing
                            ? 'border border-gray-200 dark:border-gray-700 text-accent'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {user.isFollowing ? 'Following' : 'Follow'}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>,
          document.querySelector('#userpopover')
        )}
    </>
  )
}
