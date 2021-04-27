import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import Dialog from '@/components/ui/dialog/Dialog'
import { IconEdit, IconSpinner, IconXLarge } from '@/components/ui/icons/Icons'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import UserAvatar from '@/components/user/UserAvatar'
import ctl from '@netlify/classnames-template-literals'
import {
  useDeleteServerMutation,
  useUpdateServerMutation
} from '@/graphql/hooks'
import { useForm } from 'react-hook-form'
import isEmail from 'validator/es/lib/isEmail'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import ServerAvatar from '@/components/server/ServerAvatar'

const inputClass = ctl(`
  w-full
  h-10
  dark:bg-gray-775
  dark:border-gray-850
  border
  rounded
  focus:outline-none
  transition
  dark:focus:border-blue-600
  px-4
  text-base
  text-primary
`)

const labelClass = ctl(`
  text-11
  font-semibold
  tracking-widest
  uppercase
  text-tertiary
  block
  pb-1.5
`)

const errorClass = ctl(`
  text-xs
  text-red-400
  pt-1.5
`)

const deleteBtn = ctl(`
  text-red-500
  border
  rounded
  border-red-500
  px-4
  h-10
  text-sm
  font-medium
  transition
  hover:bg-red-500
  hover:text-gray-100
  focus:outline-none
  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:hover:bg-transparent
  disabled:hover:text-red-500
  flex
  items-center
  select-none
`)

const cancelBtn = ctl(`
  text-tertiary
  px-2
  h-10
  text-sm
  font-medium
  focus:outline-none
`)

export default function ServerSettingsDialog({ open, setOpen, server }) {
  const [user] = useCurrentUser()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })
  const name = watch('name')
  const description = watch('description')
  const avatarFile = watch('avatarFile')
  const bannerFile = watch('bannerFile')

  const [updateServer, { loading: updateLoading }] = useUpdateServerMutation()

  const close = () => {
    setOpen(false)
    setTimeout(() => reset(), 300)
  }

  const onSubmit = ({ name }) => {
    console.log(name)
  }

  return (
    <>
      <Dialog isOpen={open} close={close}>
        <div className="min-w-full h-full min-h-full h-screen dark:bg-gray-800 scrollbar-custom">
          <div className="w-full relative flex">
            <button
              className="absolute top-3 right-3 focus:outline-none rounded-full transition dark:hover:bg-gray-700 p-2"
              onClick={close}
            >
              <IconXLarge className="w-6 h-6 text-tertiary" />
            </button>

            <div className="w-1/3 min-w-[14rem] dark:bg-gray-800 flex justify-end px-5 py-12">
              <div className="w-56">
                <SidebarLabel>{server.name}</SidebarLabel>
                <SidebarItem>Settings</SidebarItem>
                <SidebarItem>Roles</SidebarItem>
              </div>
            </div>
            <div className="w-2/3 px-10 py-16 min-h-screen dark:bg-gray-750">
              <div className="max-w-screen-sm text-left">
                <div className="font-semibold text-primary uppercase mb-6">
                  Planet Settings
                </div>
                <div className="flex">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    id="avatarFile"
                    hidden
                    {...register('avatarFile')}
                  />
                  <label
                    htmlFor="avatarFile"
                    className="relative h-24 w-24 group"
                  >
                    <ServerAvatar
                      server={server}
                      className="rounded-full dark:bg-gray-800"
                      size={24}
                    />
                    <div className="absolute rounded-full cursor-pointer inset-0 bg-black opacity-0 group-hover:opacity-100 bg-opacity-50 z-10 transition flex items-center justify-center">
                      <IconEdit className="w-1/2 h-1/2" />
                    </div>
                  </label>

                  <div className="ml-6">
                    <label className={labelClass}>Name</label>
                    <input
                      className={inputClass}
                      {...register('name')}
                      defaultValue={server.name}
                    />
                  </div>
                </div>

                <div className="pt-5 pb-5 w-full">
                  <label className={labelClass}>Description</label>
                  <textarea
                    className="h-24 w-full scrollbar-custom dark:bg-gray-775 border dark:border-gray-850 rounded resize-none"
                    defaultValue={server.description}
                    {...register('description')}
                  />
                </div>

                <div className={labelClass}>Banner</div>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  id="bannerFile"
                  hidden
                  {...register('bannerFile')}
                />
                <div className="block w-full h-32 relative group bg-gradient-to-br from-red-400 to-indigo-600 rounded">
                  <label
                    htmlFor="bannerFile"
                    className="block absolute rounded cursor-pointer inset-0 bg-black opacity-0 group-hover:opacity-100 bg-opacity-50 z-10 transition flex items-center justify-center"
                  >
                    <IconEdit className="w-1/2 h-1/2" />
                  </label>
                </div>

                <div className="mt-10 flex items-center space-x-5 justify-end">
                  <button
                    type="button"
                    onClick={() => setDeleteOpen(true)}
                    className={deleteBtn}
                  >
                    Delete Planet
                  </button>

                  <button
                    type="submit"
                    className="disabled:opacity-50 disabled:cursor-not-allowed rounded px-4 h-10 text-sm text-primary bg-green-600 focus:outline-none flex items-center"
                  >
                    Save Changes
                    {updateLoading && (
                      <IconSpinner className="w-5 h-5 text-primary ml-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DeleteServerDialog
          server={server}
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
        />
      </Dialog>
    </>
  )
}

function DeleteServerDialog({ deleteOpen, setDeleteOpen, server }) {
  const [password, setPassword] = useState('')
  const [deleteServer, { loading }] = useDeleteServerMutation()
  const { push } = useHistory()
  const apolloClient = useApolloClient()

  return (
    <Dialog isOpen={deleteOpen} close={() => setDeleteOpen(false)}>
      <div className="max-w-md w-full rounded-md dark:bg-gray-800 shadow-lg p-4">
        <div className="text-red-400 text-2xl font-semibold">
          Delete {server.name}
        </div>

        <div className="text-secondary pb-5 pt-3 text-base">
          You will not be able to restore this planet.
        </div>

        <div className="text-left">
          <label htmlFor="confirmPassword" className={labelClass}>
            Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            className={inputClass}
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4">
          <button
            className={cancelBtn}
            type="button"
            onClick={() => setDeleteOpen(false)}
          >
            Cancel
          </button>
          <button
            className={deleteBtn}
            type="button"
            disabled={!password || loading}
            onClick={() => {
              deleteServer({
                variables: { input: { password, serverId: server.id } }
              }).then(() => {
                setDeleteOpen(false)
                push('/')
                apolloClient.resetStore()
              })
            }}
          >
            Delete {server.name}
            {loading && <IconSpinner className="w-5 h-5 text-primary ml-3" />}
          </button>
        </div>
      </div>
    </Dialog>
  )
}
