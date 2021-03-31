import { forwardRef, useEffect, useState } from 'react'
import Sidebar from '@/components/sidebars/base/Sidebar'
import SidebarSortButtons from '@/components/sidebars/base/SidebarSortButtons'
import { useHistory } from 'react-router-dom'
import { IconChevronDown, IconChannel } from '@/lib/Icons'
import { useForm } from 'react-hook-form'
import { Switch, Dialog as HDialog } from '@headlessui/react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/dialogs/base/Dialog'
import { useMutation } from 'urql'
import { CREATE_CHANNEL } from '@/graphql/mutations/channel'
import {
  useServerChannels,
  useServer
} from '@/components/providers/DataProvider'
import SidebarLabel from '@/components/sidebars/base/SidebarLabel'
import SidebarItem from '@/components/sidebars/base/SidebarItem'
import { useHasServerPermissions } from '@/lib/hasPermission'
import { ServerPermission } from '@/lib/ServerPermission'

export default forwardRef((props, ref) => {
  const server = useServer()
  const channels = useServerChannels()
  if (!server) return null
  return (
    <Sidebar ref={ref}>
      <div className="h-12 border-b dark:border-gray-850 flex items-center justify-between px-5 text-base font-medium">
        {server.name}
        <IconChevronDown className="w-5 h-5" />
      </div>

      <div className="px-1.5">
        <SidebarLabel plusLabel="Create Post">Feed</SidebarLabel>

        <SidebarSortButtons />

        <CreateChannel server={server} />

        <div className="space-y-0.5">
          {channels.map(channel => (
            <Channel key={channel.id} channel={channel} server={server} />
          ))}
        </div>
      </div>
    </Sidebar>
  )
})

function Channel({ channel, server }) {
  return (
    <SidebarItem to={`/server/${server.id}/channel/${channel.id}`}>
      <IconChannel className="w-5 h-5 mr-3" />
      {channel.name}
    </SidebarItem>
  )
}

function CreateChannel({ server }) {
  const [canManageChannels] = useHasServerPermissions(
    [ServerPermission.ManageChannels],
    server.id
  )

  if (!canManageChannels) return <SidebarLabel>CHANNELS</SidebarLabel>

  const [isOpen, setIsOpen] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)

  const { handleSubmit, register, reset } = useForm()

  useEffect(() => {
    if (!isOpen) return
    reset()
    setIsPrivate(false)
  }, [isOpen])

  const { push } = useHistory()

  const [{ fetching }, createChannel] = useMutation(CREATE_CHANNEL)

  const onSubmit = ({ name }) => {
    createChannel({ name, serverId: server.id, isPrivate }).then(
      ({ data: { createChannel } }) => {
        setIsOpen(false)
        push(createChannel.id)
      }
    )
  }

  return (
    <>
      <SidebarLabel onClick={() => setIsOpen(true)} plusLabel="Create Channel">
        Channels
      </SidebarLabel>

      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <HDialog.Title className="title mb-4">Create Channel</HDialog.Title>

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

          <Button loading={fetching}>Continue</Button>

          <Switch.Group
            as="div"
            className="w-full flex items-center space-x-3 mt-4"
          >
            <Switch.Label className="uppercase text-11 font-semibold tracking-widest text-tertiary select-none">
              Private Channel
            </Switch.Label>
            <Switch
              as="button"
              checked={isPrivate}
              onChange={setIsPrivate}
              className={`${
                isPrivate ? 'bg-blue-500' : 'dark:bg-gray-800'
              } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
            >
              {({ checked }) => (
                <span
                  className={`${
                    checked ? 'translate-x-5' : 'translate-x-0'
                  } inline-block w-5 h-5 transition duration-200 ease-in-out transform dark:bg-white rounded-full`}
                />
              )}
            </Switch>
          </Switch.Group>
        </form>
      </Dialog>
    </>
  )
}
