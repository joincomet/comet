import StyledDialog from '@/components/ui/dialog/StyledDialog'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  ChannelType,
  ServerDocument,
  useCreateChannelMutation, useUpdateChannelMutation
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

export default function CreateChannelDialog({ open, setOpen, server, channel }) {
  const { handleSubmit, register, setValue, watch, reset } = useForm({
    mode: 'onChange'
  })
  const name = watch('name')
  useEffect(() => {
    if (name) {
      setValue(
        'name',
        name
          .toLowerCase()
          .replace(' ', '-')
          .replace(/[^a-z0-9-_]+/, '')
      )
    }
  }, [name])
  const [type, setType] = useState(channel?.type ?? ChannelType.Public)

  const { push } = useHistory()

  const [createChannel, { loading }] = useCreateChannelMutation({
    update(cache, { data: { createChannel } }) {
      cache.writeQuery({
        query: ServerDocument,
        variables: {
          name: server.name
        },
        data: {
          server: {
            ...server,
            channels: [...server.channels, createChannel]
          }
        }
      })
    }
  })

  const [updateChannel, { loading: updateLoading }] = useUpdateChannelMutation()

  const close = () => {
    setOpen(false)
  }

  const onSubmit = ({ name, description }) => {
    if (!channel) {
      createChannel({
        variables: { input: { name, description, serverId: server.id, type } }
      }).then(({ data: { createChannel } }) => {
        close()
        push(`/+${server.name}/#${createChannel.name}`)
        reset()
        setType(ChannelType.Public)
      })
    } else {
      updateChannel({
        variables: {
          input: { description, channelId: channel.id, type }
        }
      }).then(() => {
        close()
      })
    }
  }

  useEffect(() => {
    if (!channel) {
      reset()
      setType(ChannelType.Public)
    } else {
      setValue('name', channel.name)
      setValue('description', channel.description || '')
      setType(channel.type)
    }
  }, [channel])

  const channelAlreadyExists =
    !channel && !!name && server.channels.map(c => c.name).includes(name)

  return (
    <StyledDialog
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      close={close}
      closeOnOverlayClick
      buttons={
        <button
          type="submit"
          className="form-button-submit"
          disabled={(!channel && !name) || channelAlreadyExists || loading || updateLoading}
        >
          {(loading || updateLoading) ? (
            <IconSpinner className="w-5 h-5" />
          ) : (
            <IconCheck className="w-5 h-5" />
          )}
        </button>
      }
    >
      <div className="p-5 space-y-4 w-full text-left">
        <div className="flex items-center font-semibold text-primary">
          <ServerAvatar server={server} size={6} className="rounded-md mr-2" />
          <div className="truncate">{server.displayName}</div>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;{channel ? 'Edit' : 'Create'} Channel
          <IconX
            className="h-5 w-5 highlightable ml-auto"
            onClick={() => close()}
          />
        </div>
        <div>
          <div className="relative">
            <input
              {...register('name', { required: true, maxLength: 100 })}
              maxLength={100}
              className="form-input-icon"
              spellCheck={false}
              autoCapitalize="none"
              id="name"
              placeholder="Channel name"
              disabled={!!channel}
            />
            <IconChannel className="form-input-icon-icon" />
          </div>
          {channelAlreadyExists && (
            <div className="form-error">Channel already exists</div>
          )}
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
