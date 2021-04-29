import Dialog from '@/components/ui/dialog/Dialog'
import { IconEdit, IconSpinner, IconXLarge } from '@/components/ui/icons/Icons'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import ctl from '@netlify/classnames-template-literals'
import {
  useDeleteServerMutation,
  useUpdateServerMutation
} from '@/graphql/hooks'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ServerAvatar from '@/components/server/ServerAvatar'
import CategorySelect from '@/components/server/CategorySelect'
import { useTranslation } from 'react-i18next'
import RoleSettings from '@/components/server/settings/RoleSettings'

const Tab = {
  Settings: 'Settings',
  Roles: 'Roles'
}

export default function ServerSettingsDialog({ open, setOpen, server }) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const { register, handleSubmit, watch, reset } = useForm({
    mode: 'onChange'
  })
  const name = watch('name')
  const description = watch('description')
  const [updateServer, { loading: updateLoading }] = useUpdateServerMutation()
  const [category, setCategory] = useState(server.category)
  const [currentTab, setCurrentTab] = useState(Tab.Settings)

  const close = () => {
    setOpen(false)
    setTimeout(() => reset(), 300)
  }

  const onSubmit = ({ name, description }) => {
    updateServer({
      variables: {
        input: { serverId: server.id, name, description, category }
      }
    })
  }

  return (
    <>
      <Dialog isOpen={open} close={close}>
        <div
          className="min-w-full h-full min-h-full h-screen dark:bg-gray-800 scrollbar-custom"
          onClick={e => e.stopPropagation()}
        >
          <div className="w-full relative flex">
            <button
              className="absolute top-3 right-3 focus:outline-none rounded-full transition dark:hover:bg-gray-700 p-2"
              onClick={close}
            >
              <IconXLarge className="w-6 h-6 text-tertiary" />
            </button>

            <div className="w-1/3 min-w-[14rem] dark:bg-gray-800 flex justify-end px-5 py-12">
              <div className="w-56 space-y-0.5">
                <SidebarLabel>{server.name}</SidebarLabel>
                <SidebarItem
                  active={currentTab === Tab.Settings}
                  onClick={() => setCurrentTab(Tab.Settings)}
                >
                  Settings
                </SidebarItem>
                <SidebarItem
                  active={currentTab === Tab.Roles}
                  onClick={() => setCurrentTab(Tab.Roles)}
                >
                  Roles
                </SidebarItem>
              </div>
            </div>
            <div className="w-2/3 px-8 py-16 min-h-screen dark:bg-gray-750">
              {currentTab === Tab.Settings && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-screen-sm text-left"
                >
                  <div className="font-semibold text-primary uppercase mb-6">
                    Planet Settings
                  </div>
                  <div className="flex">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      id="avatarFile"
                      hidden
                      name="avatarFile"
                      onChange={e => {
                        const avatarFile = e.target.files[0]
                        if (!avatarFile) return
                        updateServer({
                          variables: {
                            input: { serverId: server.id, avatarFile }
                          }
                        })
                      }}
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

                    <div className="ml-6 w-full space-y-3">
                      <div>
                        <label className="label">Name</label>
                        <input
                          className="textbox"
                          {...register('name')}
                          defaultValue={server.name}
                        />
                      </div>

                      <div>
                        <label className="label">Category</label>

                        <CategorySelect
                          category={category}
                          setCategory={setCategory}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 pb-5 w-full">
                    <label className="label">Description</label>
                    <textarea
                      className="h-24 w-full text-base scrollbar-custom dark:bg-gray-775 border dark:border-gray-850 rounded resize-none"
                      defaultValue={server.description}
                      {...register('description')}
                    />
                  </div>

                  <div className="label">Banner</div>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    id="bannerFile"
                    hidden
                    name="bannerFile"
                    onChange={e => {
                      const bannerFile = e.target.files[0]
                      if (!bannerFile) return
                      updateServer({
                        variables: {
                          input: { serverId: server.id, bannerFile }
                        }
                      })
                    }}
                  />
                  <label
                    htmlFor="bannerFile"
                    className={`block w-full h-32 relative group ${
                      server.bannerUrl
                        ? ''
                        : 'bg-gradient-to-br from-red-400 to-indigo-600'
                    } rounded bg-center bg-no-repeat bg-cover`}
                    style={
                      server.bannerUrl
                        ? { backgroundImage: `url(${server.bannerUrl})` }
                        : {}
                    }
                  >
                    <div className="block absolute rounded cursor-pointer inset-0 bg-black opacity-0 group-hover:opacity-100 bg-opacity-50 z-10 transition flex items-center justify-center">
                      <IconEdit className="w-1/2 h-1/2" />
                    </div>
                  </label>

                  <div className="mt-10 flex items-center space-x-5 justify-end">
                    <button
                      type="button"
                      onClick={() => setDeleteOpen(true)}
                      className="delete-button"
                    >
                      Delete Planet
                    </button>

                    <button
                      type="submit"
                      className="save-button"
                      disabled={
                        (!name || name === server.name) &&
                        (description || '') === (server.description || '') &&
                        category === server.category
                      }
                    >
                      Save Changes
                      {updateLoading && (
                        <IconSpinner className="w-5 h-5 text-primary ml-3" />
                      )}
                    </button>
                  </div>
                </form>
              )}
              {currentTab === Tab.Roles && <RoleSettings server={server} />}
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
          <label htmlFor="confirmPassword" className="label">
            Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            className="textbox"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4">
          <button
            className="cancel-button"
            type="button"
            onClick={() => setDeleteOpen(false)}
          >
            Cancel
          </button>
          <button
            className="delete-button"
            type="button"
            disabled={!password || loading}
            onClick={() => {
              deleteServer({
                variables: { input: { password, serverId: server.id } }
              }).then(() => {
                setDeleteOpen(false)
                push('/me')
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
