import StyledDialog from '@/components/ui/dialog/StyledDialog'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  ChannelType,
  CurrentUserDocument,
  useCreateChannelMutation
} from '@/graphql/hooks'
import { IconChannel } from '@/components/ui/icons/IconChannel'
import ServerAvatar from '@/components/server/ServerAvatar'
import { IconCheck, IconSpinner, IconX } from '@/components/ui/icons/Icons'
import ctl from '@netlify/classnames-template-literals'
import Tippy from '@tippyjs/react'

const dotClass = enabled =>
  ctl(`
  h-1.5
  w-1.5
  rounded-full
  dark:bg-gray-100
  mr-2
  ${enabled ? 'opacity-100' : 'opacity-0'}
`)

const typeClass = enabled =>
  ctl(`
  flex
  items-center
  cursor-pointer
  ${
    enabled
      ? 'text-primary'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
  }
`)

export default function CreateChannelDialog({ open, setOpen, server }) {
  const { handleSubmit, register } = useForm({ mode: 'onChange' })
  const [type, setType] = useState(ChannelType.Public)

  const { push } = useHistory()

  const [createChannel, { loading }] = useCreateChannelMutation({
    update(cache, { data: { createChannel } }) {
      const data = cache.readQuery({ query: CurrentUserDocument })
      const clone = JSON.parse(JSON.stringify(data))
      const server = clone.user.servers.find(s => s.id === server.id)
      server.channels = [createChannel].concat(server.channels)
      cache.writeQuery({ query: CurrentUserDocument, data: clone })
    }
  })

  const onSubmit = ({ name, description }) => {
    createChannel({
      variables: { input: { name, description, serverId: server.id, type } }
    }).then(({ data: { createChannel } }) => {
      close()
      push(`/+${server.name}/#${createChannel.name}`)
    })
  }

  const close = () => {
    setOpen(false)
  }
  return (
    <StyledDialog
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      close={close}
      closeOnOverlayClick
      buttons={
        <button type="submit" className="form-button-submit">
          {loading ? (
            <IconSpinner className="w-5 h-5" />
          ) : (
            <IconCheck className="w-5 h-5" />
          )}
        </button>
      }
    >
      <div className="p-5 space-y-4 w-full">
        <div className="flex items-center font-semibold text-primary">
          <IconChannel className="w-5 h-5 mr-2" />
          Create Channel&nbsp;&nbsp;&middot;&nbsp;&nbsp;
          <ServerAvatar server={server} size={6} className="rounded-md mr-2" />
          <div className="truncate">{server.displayName}</div>
          <IconX
            className="h-5 w-5 highlightable ml-auto"
            onClick={() => close()}
          />
        </div>
        <div className="relative">
          <input
            {...register('name', { required: true, maxLength: 100 })}
            maxLength={100}
            className="form-input"
            spellCheck={false}
            autoCapitalize="none"
            id="name"
            placeholder="Channel name"
          />
          {/*<IconChannel className="form-input-icon-icon" />*/}
        </div>

        <textarea
          placeholder="Description"
          {...register('description')}
          className="form-textarea"
        />

        <div className="flex items-center space-x-4 text-sm text-tertiary">
          <Tippy content="Anyone can view and send messages">
            <div
              onClick={() => setType(ChannelType.Public)}
              className={typeClass(type === ChannelType.Public)}
            >
              <div className={dotClass(type === ChannelType.Public)} />
              Public
            </div>
          </Tippy>

          <Tippy content="Anyone can view, but only members with permission can send messages">
            <div
              onClick={() => setType(ChannelType.Restricted)}
              className={typeClass(type === ChannelType.Restricted)}
            >
              <div className={dotClass(type === ChannelType.Restricted)} />
              Restricted
            </div>
          </Tippy>

          <Tippy content="Only members with permission can view and send messages">
            <div
              onClick={() => setType(ChannelType.Private)}
              className={typeClass(type === ChannelType.Private)}
            >
              <div className={dotClass(type === ChannelType.Private)} />
              Private
            </div>
          </Tippy>
        </div>
      </div>
    </StyledDialog>
  )
}
