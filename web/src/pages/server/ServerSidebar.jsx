import { useEffect, useState } from 'react'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarSortButtons from '@/components/ui/sidebar/SidebarSortButtons'
import { useHistory } from 'react-router-dom'
import {
  IconChevronDown,
  IconChannel,
  IconUsers,
  IconSettings
} from '@/components/ui/icons/Icons'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/dialog/Dialog'
import { useCreateChannelMutation } from '@/graphql/mutations/channel'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import { ServerPermission } from '@/types/ServerPermission'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'
import Switch from '@/components/ui/Switch'
import DialogTitle from '@/components/ui/dialog/DialogTitle'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useServerChannels } from '@/providers/ServerProvider'

export default function ServerSidebar({ server }) {
  const channels = useServerChannels(server.id)

  return (
    <Sidebar>
      <div className="h-12 border-b dark:border-gray-850 flex items-center justify-between px-5 text-base font-medium">
        {server.name}
        <IconChevronDown className="w-5 h-5" />
      </div>

      <div className="px-1.5 pt-4">
        <SidebarItem>
          <IconUsers className="mr-3 w-5 h-5" />
          Invite People
        </SidebarItem>

        <SidebarLabel plusLabel="Create Post">Feed</SidebarLabel>

        <SidebarSortButtons />

        <CreateChannel serverId={server.id} />

        <div className="space-y-0.5">
          {channels.map(channel => (
            <Channel key={channel.id} channel={channel} serverId={server.id} />
          ))}
        </div>
      </div>
    </Sidebar>
  )
}

function Channel({ channel, serverId }) {
  const { t } = useTranslation()
  return (
    <SidebarItem to={`/server/${serverId}/channel/${channel.id}`}>
      <IconChannel className="w-5 h-5 mr-3" />
      {channel.name}
      <Tippy content={t('channel.edit')}>
        <div className="group-hover:opacity-100 opacity-0 ml-auto">
          <IconSettings className="w-4 h-4 text-tertiary" />
        </div>
      </Tippy>
    </SidebarItem>
  )
}

function CreateChannel({ serverId }) {
  const { t } = useTranslation()

  const [canManageChannels] = useHasServerPermissions(serverId, [
    ServerPermission.ManageChannels
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)

  const { handleSubmit, register, reset } = useForm()

  useEffect(() => {
    if (!isOpen) return
    reset()
    setIsPrivate(false)
  }, [isOpen, setIsPrivate, reset])

  const { push } = useHistory()

  const [{ fetching }, createChannel] = useCreateChannelMutation()

  const onSubmit = ({ name }) => {
    createChannel({ name, serverId, isPrivate }).then(
      ({ data: { createChannel } }) => {
        setIsOpen(false)
        push(`/server/${serverId}/channel/${createChannel.id}`)
      }
    )
  }

  if (!canManageChannels) return <SidebarLabel>CHANNELS</SidebarLabel>

  return (
    <>
      <SidebarLabel onClick={() => setIsOpen(true)} plusLabel="Create Channel">
        Channels
      </SidebarLabel>

      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <DialogTitle className="title mb-4">Create Channel</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 w-full">
            <label className="label" htmlFor="name">
              Channel Name
            </label>

            <div className="relative">
              <input
                {...register('name', {
                  required: true,
                  maxLength: 100,
                  pattern: /[a-z0-9_-]+/g
                })}
                maxLength={100}
                className="textbox pl-9 pr-3 lowercase"
                spellCheck={false}
                autoCapitalize="none"
                id="name"
                onChange={e => {
                  if (e.target.value === ' ' || e.target.value === '-')
                    e.target.value = ''
                  e.target.value = e.target.value
                    .toLowerCase()
                    .replace(' ', '-')
                  if (e.target.value.endsWith('--'))
                    e.target.value = e.target.value.substring(
                      0,
                      e.target.value.length - 1
                    )
                  e.target.value = e.target.value.replace(/[^a-z0-9_-]+/g, '')
                }}
              />

              <div className="absolute left-0 top-0 bottom-0 flex items-center w-10 justify-center pointer-events-none">
                <IconChannel className="w-5 h-5 text-tertiary" />
              </div>
            </div>
          </div>

          <Button loading={fetching}>{t('continue')}</Button>

          <Switch checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)}>
            {t('channel.togglePrivate')}
          </Switch>
        </form>
      </Dialog>
    </>
  )
}
