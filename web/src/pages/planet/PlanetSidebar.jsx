import React, { forwardRef, useEffect, useState } from 'react'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarSortButtons from '@/components/ui/sidebar/SidebarSortButtons'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { HiPlus, HiChevronDown, HiHashtag } from 'react-icons/hi'
import { useMutation, useQuery } from 'urql'
import { CURRENT_USER_QUERY, useCurrentUserQuery } from '@/lib/queries'
import Modal from 'react-responsive-modal'
import { useForm } from 'react-hook-form'
import {
  modal,
  overlay
} from '@/components/planet-scroller/CreatePlanetDialog.module.css'
import { Switch } from '@headlessui/react'
import Button from '@/components/Button'
import { useCreateChannelMutation } from '@/lib/mutations'

export default forwardRef(({ planet }, ref) => {
  return (
    <Sidebar ref={ref}>
      <div className="h-12 border-b dark:border-gray-850 flex items-center justify-between px-5 text-base font-medium">
        {planet.name}
        <HiChevronDown className="w-5 h-5" />
      </div>

      <div className="px-1.5">
        <div className="sidebar-label">POSTS</div>

        <SidebarSortButtons />

        <CreateChannel planet={planet} />

        <div className="space-y-0.5">
          {planet.channels.map(channel => (
            <ChatChannel key={channel.id} channel={channel} planet={planet} />
          ))}
        </div>
      </div>
    </Sidebar>
  )
})

function ChatChannel({ channel, planet }) {
  return (
    <NavLink
      to={`/planet/${planet.id}/channel/${channel.id}`}
      className="sidebar-item"
      activeClassName="sidebar-item--active"
    >
      <HiHashtag className="w-5 h-5 mr-3" />
      {channel.name}
    </NavLink>
  )
}

function CreateChannel({ planet }) {
  const [
    {
      data: { currentUser }
    }
  ] = useCurrentUserQuery()
  const isMod = planet.moderators.map(m => m.id).includes(currentUser.id)

  if (!isMod) return <div className="sidebar-label">CHANNELS</div>

  const [open, setOpen] = useState(false)
  const [modOnly, setModOnly] = useState(false)

  const { handleSubmit, register, reset } = useForm()

  useEffect(() => {
    if (!open) return
    reset()
    setModOnly(false)
  }, [open])

  const { push } = useHistory()

  const [{ fetching }, createChannel] = useCreateChannelMutation()

  const onSubmit = variables => {
    createChannel({
      variables: { ...variables, planetId: planet.id }
    }).then(({ data: { createChannel } }) => {
      setOpen(false)
      push(createChannel.id)
    })
  }

  return (
    <>
      <div
        className="sidebar-label sidebar-label--plus"
        onClick={() => setOpen(true)}
      >
        CHANNELS
        <HiPlus className="w-4 h-4" />
      </div>

      <Modal
        center
        open={open}
        onClose={() => setOpen(false)}
        classNames={{
          modal,
          overlay
        }}
        showCloseIcon={false}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="card">
          <div className="title mb-4">Create Channel</div>

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
                <HiHashtag className="w-5 h-5 text-tertiary" />
              </div>
            </div>
          </div>

          <Button loading={fetching}>Continue</Button>

          <Switch.Group
            as="div"
            className="w-full flex items-center space-x-3 mt-4"
          >
            <Switch.Label className="uppercase text-11 font-semibold tracking-widest text-tertiary select-none">
              Moderators Only
            </Switch.Label>
            <Switch
              as="button"
              checked={modOnly}
              onChange={setModOnly}
              className={`${
                modOnly ? 'bg-blue-500' : 'dark:bg-gray-800'
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
      </Modal>
    </>
  )
}
