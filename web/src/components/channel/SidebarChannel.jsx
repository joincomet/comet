import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import {
  IconChannel,
  IconSettings,
  IconSpinner
} from '@/components/ui/icons/Icons'
import { useTranslation } from 'react-i18next'
import Tippy from '@tippyjs/react'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import {
  ServerDocument,
  ServerPermission,
  useDeleteChannelMutation
} from '@/graphql/hooks'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import CountBadge from '@/components/ui/CountBadge'
import { useHistory, useLocation } from 'react-router-dom'
import StyledDialog from '@/components/ui/dialog/StyledDialog'
import { useState } from 'react'
import CreateChannelDialog from "@/components/channel/CreateChannelDialog";

export default function SidebarChannel({ channel, server }) {
  const { t } = useTranslation()

  const [canManageChannels] = useHasServerPermissions({
    server,
    permissions: [ServerPermission.ManageChannels]
  })

  const { hash } = useLocation()
  const to = `/+${server?.name}/#${channel.name}`
  const active = hash.substring(1) === channel.name
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  return (
    <>
      <CreateChannelDialog open={editOpen} setOpen={setEditOpen} channel={channel} server={server} />

      <ContextMenuTrigger
        data={{
          type: ContextMenuType.Channel,
          channel,
          server,
          openDelete: () => setDeleteOpen(true),
          openEdit: () => setEditOpen(true),
        }}
      >
        <SidebarItem to={to} active={active}>
          {channel.isUnread && !active && (
            <div className="absolute -left-1.5 top-1/2 transform -translate-y-1/2 rounded-r-full dark:bg-gray-100 bg-gray-900 h-2 w-1" />
          )}

          <IconChannel className={`w-5 h-5 mr-3 text-tertiary`} />
          <span className={`${channel.isUnread ? 'text-primary' : ''}`}>
            {channel.name}
          </span>

          <div className="ml-auto" />
          {!!channel.mentionCount && (
            <div
              className={canManageChannels ? 'group-hover:hidden block' : ''}
            >
              <CountBadge count={channel.mentionCount} />
            </div>
          )}
          {canManageChannels && (
            <Tippy content={t('channel.edit')}>
              <div className="group-hover:block hidden" onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setEditOpen(true)
              }}>
                <IconSettings className="w-4 h-4 text-tertiary" />
              </div>
            </Tippy>
          )}
        </SidebarItem>
      </ContextMenuTrigger>

      <DeleteChannelDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        channel={channel}
        server={server}
      />
    </>
  )
}

function DeleteChannelDialog({ server, channel, open, setOpen }) {
  const [deleteChannel, { loading }] = useDeleteChannelMutation()
  const { push } = useHistory()
  const { pathname, hash } = useLocation()
  const doDelete = () => {
    deleteChannel({
      variables: { input: { channelId: channel.id } },
      update(cache, { data: { deleteChannel } }) {
        cache.writeQuery({
          query: ServerDocument,
          variables: {
            name: server.name
          },
          data: {
            server: {
              ...server,
              channels: server.channels.filter(c => c.id !== deleteChannel)
            }
          }
        })
      }
    }).then(() => {
      setOpen(false)
      if (pathname === `/+${server.name}/` && hash === `#${channel.name}`) {
        push(`/+${server.name}`)
      }
    })
  }

  return (
    <StyledDialog
      closeOnOverlayClick
      small
      open={open}
      close={() => setOpen(false)}
      buttons={
        <>
          <button
            className="form-button-cancel"
            onClick={() => setOpen(false)}
            type="button"
          >
            Cancel
          </button>

          <button
            className="form-button-delete"
            disabled={loading}
            onClick={() => doDelete()}
            type="button"
          >
            {loading ? <IconSpinner /> : 'Delete'}
          </button>
        </>
      }
    >
      <div className="px-4 pt-4 pb-10">
        <div className="text-lg font-medium text-secondary">
          Delete <span className="text-primary">#{channel.name}</span>?
        </div>
        <div className="text-tertiary pt-3 text-sm">
          Messages in this channel will be lost.
        </div>
      </div>
    </StyledDialog>
  )
}
