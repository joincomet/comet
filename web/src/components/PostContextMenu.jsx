import React from 'react'
import { useContextMenuEvent } from 'react-context-menu-wrapper'
import { Menu } from '@headlessui/react'
import { useUser } from '@/components/providers/UserProvider'
import { IconChevrownRight } from '@/lib/Icons'
import { useMutation, useQuery } from 'urql'
import { GET_SERVER_PERMISSIONS } from '@/graphql/queries'
import { useCopyToClipboard } from 'react-use'
import { REMOVE_POST, PIN_POST, UNPIN_POST } from '@/graphql/mutations'
import toast from 'react-hot-toast'
import { ServerPermission, useHasServerPermissions } from '@/lib/hasPermission'

export default function PostContextMenu() {
  const menuEvent = useContextMenuEvent()
  if (!menuEvent || !menuEvent.data) return null
  const post = menuEvent.data

  const [canPinPost, canManagePosts, canAddToFolder] = useHasServerPermissions(
    [
      ServerPermission.PinPosts,
      ServerPermission.ManagePosts,
      ServerPermission.AddPostsToFolder
    ],
    post.server.id
  )

  const [_clipboardState, copyToClipboard] = useCopyToClipboard()

  const [_removePostRes, removePost] = useMutation(REMOVE_POST)
  const [_pinPostRes, pinPost] = useMutation(PIN_POST)
  const [_unpinPostRes, unpinPost] = useMutation(UNPIN_POST)

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Items
            static
            className="p-2 absolute right-0 w-48 mt-4 origin-top-right dark:bg-gray-900 rounded shadow-lg outline-none"
          >
            <div className="space-y-0.5">
              <PostContextMenuItem
                onClick={() => {
                  copyToClipboard(`${post.relativeUrl}`)
                  toast.success('Copied link to clipboard!')
                }}
                label="Copy Post Link"
              />
              <PostContextMenuItem label="Add to Folder" arrow />
              <PostContextMenuItem label="Send to Friend" arrow />
            </div>
            {!post.author.isCurrentUser ? (
              <>
                <MenuDivider />
                <PostContextMenuItem
                  label="Report"
                  red
                  onClick={() => toast.error('Report is coming soon!')}
                />
              </>
            ) : (
              <>
                <MenuDivider />
                <div className="space-y-0.5">
                  <PostContextMenuItem label="Edit Post" />
                  <PostContextMenuItem label="Delete Post" red />
                </div>
              </>
            )}
            {canManagePosts && (
              <>
                <MenuDivider />
                <div className="space-y-0.5">
                  {canPinPost && (
                    <PostContextMenuItem
                      label={`${post.isPinned ? 'Unpin' : 'Pin'} Post`}
                      onClick={() => {
                        if (post.isPinned) {
                          unpinPost({ postId: post.id })
                          toast.success('Unpinned post!')
                        } else {
                          pinPost({ postId: post.id })
                          toast.success('Pinned post!')
                        }
                      }}
                    />
                  )}
                  {canAddToFolder && (
                    <PostContextMenuItem
                      arrow
                      label={`Add to Server Folder`}
                      onClick={() => {
                        if (post.isPinned) {
                          unpinPost({ postId: post.id })
                          toast.success('Unpinned post!')
                        } else {
                          pinPost({ postId: post.id })
                          toast.success('Pinned post!')
                        }
                      }}
                    />
                  )}
                  <PostContextMenuItem
                    label="Remove Post"
                    red
                    onClick={() => {
                      const reason = window.prompt(
                        '(Optional) Reason for removal:'
                      )
                      if (reason === null) return
                      removePost({ postId: post.id, reason })
                      toast.success('Removed post!')
                    }}
                  />
                </div>
              </>
            )}
          </Menu.Items>
        </>
      )}
    </Menu>
  )
}

function PostContextMenuItem({ label, onClick, red = false, arrow = false }) {
  return (
    <Menu.Item onClick={onClick}>
      {({ active }) => (
        <div
          className={`${
            active
              ? `text-white dark:text-white ${
                  red ? 'dark:bg-red-500' : 'dark:bg-green-600'
                }`
              : ''
          } ${
            red
              ? 'text-red-500 dark:active:bg-red-600'
              : 'text-gray-600 dark:text-gray-400 dark:active:bg-green-700'
          } active:text-white dark:active:text-white flex select-none cursor-pointer w-full px-2 h-8 flex items-center text-13 rounded-sm font-medium focus:outline-none`}
        >
          {label}
          {arrow && <IconChevrownRight className="w-5 h-5 ml-auto" />}
        </div>
      )}
    </Menu.Item>
  )
}

function MenuDivider() {
  return <div className="border-t dark:border-gray-800 mt-2 pb-2" />
}
