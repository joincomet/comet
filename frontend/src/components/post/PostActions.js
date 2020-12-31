import { BiRocket } from 'react-icons/bi'
import {
  FiMessageCircle,
  FiMoreHorizontal,
  FiTrash,
  FiAlertCircle,
  FiEdit2,
  FiShield,
  FiRadio
} from 'react-icons/fi'
import { TiPinOutline } from 'react-icons/ti'
import React, { useState } from 'react'
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
import { useIsAdmin, useIsMod, useIsModOrAdmin } from '@/lib/useIsMod'
import { useQueryClient } from 'react-query'
import usePostsVariables from '@/lib/usePostsVariables'
import { useRemovePost, useUpdatePost } from '@/lib/useUpdatePost'

const chip =
  'cursor-pointer inline-flex items-center group transition select-none'
const label = 'ml-0.5 label transition'
const icon =
  'w-9 h-9 dark:group-hover:bg-gray-800 rounded-full transition inline-flex items-center justify-center focus:outline-none'

export default function PostActions({ post, setEditing }) {
  const currentUser = useCurrentUser().data
  const { setLogin } = useLoginStore()

  const updatePost = useUpdatePost()

  const rocketPostMutation = useRocketPostMutation({
    onMutate: () => {
      updatePost(post.id36, {
        isRocketed: true,
        rocketCount: post.rocketCount + 1
      })
    }
  })
  const unrocketPostMutation = useUnrocketPostMutation({
    onMutate: () => {
      updatePost(post.id36, {
        isRocketed: false,
        rocketCount: post.rocketCount - 1
      })
    }
  })

  const rocketVariables = { postId: post.id }

  const toggle = () => {
    if (!currentUser) {
      setLogin(true)
      return
    }

    if (post.isRocketed) unrocketPostMutation.mutate(rocketVariables)
    else rocketPostMutation.mutate(rocketVariables)
  }

  const isMod = useIsMod(currentUser, post.planet)

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

      {isMod && (
        <Tippy content={`You are a moderator of +${post.planet.name}`}>
          <div className="text-green-500 mr-3 cursor-pointer">
            <FiShield size={18} />
          </div>
        </Tippy>
      )}

      <MoreOptions
        post={post}
        chip={chip}
        icon={icon}
        setEditing={setEditing}
      />
    </div>
  )
}

function MoreOptions({ post, chip, icon, setEditing }) {
  return (
    <>
      <div className="relative inline-block z-30">
        <Menu>
          {({ open }) => (
            <>
              <span
                className={`${chip} text-disabled`}
                onClick={e => e.stopPropagation()}
              >
                <Menu.Button className={`${icon}`}>
                  <FiMoreHorizontal size={18} />
                </Menu.Button>
              </span>

              <Transition show={open} {...menuTransition}>
                <Menu.Items
                  static
                  className="right-full w-56 origin-top-right menu-items"
                >
                  <PinButton post={post} />
                  <PinProfileButton post={post} />
                  <EditButton post={post} setEditing={setEditing} />
                  <DeleteButton post={post} />
                  <ReportButton post={post} />
                  <RemoveButton post={post} />
                  <BanButton post={post} />
                  <BanGlobalButton post={post} />
                  <BanAndPurgeButton post={post} />
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </>
  )
}

function PinButton({ post }) {
  if (!useIsModOrAdmin(post.planet)) return null

  const pinVariables = {
    postId: post.id,
    planetId: post.planet ? post.planet.id : undefined
  }
  const [pinned, setPinned] = useState(post.pinned)
  const pinPost = usePinPostMutation({
    onMutate: () => {
      setPinned(true)
      toast.success(`Pinned post to +${post.planet.name}`)
    }
  })
  const unpinPost = useUnpinPostMutation({
    onMutate: () => {
      setPinned(false)
      toast.success(`Unpinned post from +${post.planet.name}`)
    }
  })
  const togglePin = () => {
    if (pinned) unpinPost.mutate(pinVariables)
    else pinPost.mutate(pinVariables)
  }

  return (
    <Menu.Item>
      {({ active }) => (
        <div
          onClick={e => {
            e.stopPropagation()
            togglePin()
          }}
          className={`${
            active ? 'bg-gray-100 dark:bg-gray-700' : ''
          } text-accent menu-item`}
        >
          <TiPinOutline
            size={22}
            style={{ marginTop: '-1px' }}
            className="mr-4"
          />
          {pinned
            ? `Unpin from +${post.planet.name}`
            : `Pin to +${post.planet.name}`}
        </div>
      )}
    </Menu.Item>
  )
}

function PinProfileButton({ post }) {
  if (!post.author.isCurrentUser) return null

  const queryClient = useQueryClient()
  const postsVariables = usePostsVariables()

  const updatePost = useUpdatePost()

  const pinProfileVariables = {
    postId: post.id
  }
  const pinProfile = usePinPostProfileMutation({
    onMutate: () => {
      toast.success(`Pinned post to @${post.author.username}`)
      updatePost(post.id36, { pinnedByAuthor: true })
    }
  })
  const unpinProfile = useUnpinPostProfileMutation({
    onMutate: () => {
      toast.success(`Unpinned post from @${post.author.username}`)
      updatePost(post.id36, { pinnedByAuthor: false })
    }
  })

  const togglePinProfile = () => {
    if (post.pinnedByAuthor) unpinProfile.mutate(pinProfileVariables)
    else pinProfile.mutate(pinProfileVariables)
  }

  return (
    <Menu.Item>
      {({ active }) => (
        <div
          onClick={e => {
            e.stopPropagation()
            togglePinProfile()
          }}
          className={`${
            active ? 'bg-gray-100 dark:bg-gray-700' : ''
          } text-accent menu-item`}
        >
          <TiPinOutline
            size={22}
            style={{ marginTop: '-1px' }}
            className="mr-4"
          />
          {post.pinnedByAuthor ? 'Unpin from profile' : 'Pin to profile'}
        </div>
      )}
    </Menu.Item>
  )
}

function DeleteButton({ post }) {
  if (!post.author.isCurrentUser) return null

  const remove = useRemovePost()

  const deletePost = useDeletePostMutation({
    onMutate: () => {
      toast.success(`Deleted post!`)
      remove(post.id36)
    }
  })

  return (
    <Menu.Item>
      {({ active }) => (
        <div
          onClick={e => {
            e.stopPropagation()
            if (!window.confirm('Confirm Delete')) return
            deletePost.mutate({ postId: post.id })
          }}
          className={`${
            active ? 'bg-gray-100 dark:bg-gray-700' : ''
          } text-red-400 menu-item`}
        >
          <FiTrash size={18} className="mr-4" />
          Delete
        </div>
      )}
    </Menu.Item>
  )
}

function ReportButton({ post }) {
  if (post.author.isCurrentUser) return null

  const reportPost = useReportPostMutation({
    onMutate: () => toast.success('Reported post!')
  })

  return (
    <Menu.Item>
      {({ active }) => (
        <div
          onClick={e => {
            e.stopPropagation()
            const reason = window.prompt('Reason for removal:')
            if (!reason) return
            reportPost.mutate({ postId: post.id, reason })
          }}
          className={`${
            active ? 'bg-gray-100 dark:bg-gray-700' : ''
          } text-red-400 menu-item`}
        >
          <FiAlertCircle size={18} className="mr-4" />
          Report
        </div>
      )}
    </Menu.Item>
  )
}

function RemoveButton({ post }) {
  if (!useIsModOrAdmin(post.planet)) return null

  const remove = useRemovePost()

  const removePost = useRemovePostMutation({
    onMutate: () => {
      toast.success(`Removed post!`)
      remove(post.id36)
    }
  })

  return (
    <Menu.Item>
      {({ active }) => (
        <div
          onClick={e => {
            e.stopPropagation()
            const reason = window.prompt('Reason for removal:')
            if (!reason) return
            removePost.mutate({
              postId: post.id,
              planetId: post.planet ? post.planet.id : null,
              reason
            })
          }}
          className={`${
            active ? 'bg-gray-100 dark:bg-gray-700' : ''
          } text-red-400 menu-item`}
        >
          <FiShield size={18} className="mr-4" />
          Remove
        </div>
      )}
    </Menu.Item>
  )
}

function BanButton({ post }) {
  if (!useIsModOrAdmin(post.planet)) return null

  const banUserFromPlanet = useBanUserFromPlanetMutation({
    onMutate: () =>
      toast.success(
        `Banned @${post.author.username} from +${post.planet.name}!`
      )
  })

  return (
    <Menu.Item>
      {({ active }) => (
        <div
          onClick={e => {
            e.stopPropagation()
            const reason = window.prompt('Reason for ban:')
            if (!reason) return
            banUserFromPlanet.mutate({
              planetId: post.planet.id,
              bannedId: post.author.id,
              reason
            })
          }}
          className={`${
            active ? 'bg-gray-100 dark:bg-gray-700' : ''
          } text-red-400 menu-item`}
        >
          <FiShield size={18} className="mr-4 flex-shrink-0" />
          Ban @{post.author.username} from +{post.planet.name}
        </div>
      )}
    </Menu.Item>
  )
}

function BanGlobalButton({ post }) {
  if (!useIsAdmin()) return null

  const banUser = useBanUserMutation({
    onMutate: () => toast.success(`Banned @${post.author.username} globally!`)
  })

  return (
    <Menu.Item>
      {({ active }) => (
        <div
          onClick={e => {
            e.stopPropagation()
            const reason = window.prompt('Reason for ban:')
            if (!reason) return
            banUser.mutate({
              bannedId: post.author.id,
              reason
            })
          }}
          className={`${
            active ? 'bg-gray-100 dark:bg-gray-700' : ''
          } text-red-400 menu-item`}
        >
          <FiShield size={18} className="mr-4 flex-shrink-0" />
          Global ban @{post.author.username}
        </div>
      )}
    </Menu.Item>
  )
}

function BanAndPurgeButton({ post }) {
  if (!useIsAdmin()) return null

  const remove = useRemovePost()

  const banAndPurgeUser = useBanAndPurgeUserMutation({
    onMutate: () => {
      toast.success(`Banned and purged @${post.author.username}!`)
      remove(post.id36)
    }
  })

  return (
    <Menu.Item>
      {({ active }) => (
        <div
          onClick={e => {
            e.stopPropagation()
            const reason = window.prompt('Reason for ban and purge:')
            if (!reason) return
            if (
              !window.confirm(
                `Confirm ban and purge - will remove all posts by ${post.author.username}`
              )
            )
              return
            banAndPurgeUser.mutate({
              bannedId: post.author.id,
              reason
            })
          }}
          className={`${
            active ? 'bg-gray-100 dark:bg-gray-700' : ''
          } text-red-400 menu-item`}
        >
          <FiShield size={18} className="mr-4 flex-shrink-0" />
          Global ban & purge @{post.author.username}
        </div>
      )}
    </Menu.Item>
  )
}

function EditButton({ post, setEditing }) {
  if (!post.author.isCurrentUser) return null

  return (
    <Menu.Item>
      {({ active }) => (
        <div
          onClick={e => {
            e.stopPropagation()
            setEditing(true)
          }}
          className={`${
            active ? 'bg-gray-100 dark:bg-gray-700' : ''
          } text-tertiary menu-item`}
        >
          <FiEdit2 size={18} className="mr-4" />
          Edit Details
        </div>
      )}
    </Menu.Item>
  )
}
