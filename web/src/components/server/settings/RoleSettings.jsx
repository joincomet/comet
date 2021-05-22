import {
  CurrentUserDocument,
  ServerPermission,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation
} from '@/graphql/hooks'
import { useEffect, useState } from 'react'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import { realColors } from '@/utils/colorsMap'
import { IconCheck, IconSpinner } from '@/components/ui/icons/Icons'
import Switch from '@/components/ui/Switch'
import Dialog from '@/components/ui/dialog/Dialog'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/client'

export default function RoleSettings({ server }) {
  const { t } = useTranslation()
  const [createRoleOpen, setCreateRoleOpen] = useState(false)
  const [selectedRoleId, setSelectedRoleId] = useState(
    server.roles.find(r => r.isDefault)?.id
  )
  const selectedRole = server.roles.find(r => r.id === selectedRoleId)
  const [color, setColor] = useState(selectedRole.color)
  const [name, setName] = useState(selectedRole.name)
  const [permissions, setPermissions] = useState(selectedRole.permissions)
  useEffect(() => {
    setPermissions(selectedRole.permissions)
    setName(selectedRole.name)
    setColor(selectedRole.color)
  }, [selectedRole])
  const apolloClient = useApolloClient()
  const [deleteRole] = useDeleteRoleMutation({
    update(cache, { data: { deleteRole } }) {
      const data = cache.readQuery({ query: CurrentUserDocument })
      const clone = JSON.parse(JSON.stringify(data))
      const serv = clone.user.servers.find(s => s.id === server.id)
      serv.roles = server.roles.filter(r => r.id !== deleteRole)
      cache.writeQuery({ query: CurrentUserDocument, data: clone })
    }
  })
  const [updateRole, { loading: updateRoleLoading }] = useUpdateRoleMutation()

  const arrayEquals = (a, b) => {
    if (a.length !== b.length) return false
    for (const obj of a) {
      if (!b.includes(obj)) return false
    }
    for (const obj of b) {
      if (!a.includes(obj)) return false
    }
    return true
  }

  const madeChanges =
    !arrayEquals(permissions, selectedRole.permissions) ||
    name !== selectedRole.name ||
    color !== selectedRole.color

  return (
    <>
      <CreateRoleDialog
        server={server}
        createRoleOpen={createRoleOpen}
        setCreateRoleOpen={setCreateRoleOpen}
      />

      <div className="max-w-screen-md text-left relative">
        <div className="flex space-x-8">
          <div className="w-64">
            <SidebarLabel
              plusLabel="Create role"
              onClick={() => setCreateRoleOpen(true)}
            >
              Roles
            </SidebarLabel>
            <div className="space-y-0.5">
              {server.roles.map(role => (
                <SidebarItem
                  key={role.id}
                  active={selectedRoleId === role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  light
                >
                  <span style={{ color: role.color }}>{role.name}</span>
                </SidebarItem>
              ))}
            </div>
          </div>

          <div className="pt-4 w-full">
            <div className="flex items-center justify-between">
              <div className="text-primary text-base mb-6 font-semibold">
                Edit Role - {selectedRole.name}
              </div>

              {selectedRole.name !== '@everyone' && (
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => {
                    const cache = apolloClient.cache
                    const data = cache.readQuery({ query: CurrentUserDocument })
                    const clone = JSON.parse(JSON.stringify(data))
                    const serv = clone.user.servers.find(
                      s => s.id === server.id
                    )
                    serv.roles = serv.roles.filter(c => c.id !== selectedRoleId)
                    cache.writeQuery({
                      query: CurrentUserDocument,
                      data: clone
                    })
                    setSelectedRoleId(
                      server.roles.find(r => r.name === '@everyone')?.id
                    )
                    deleteRole({
                      variables: { input: { roleId: selectedRoleId } }
                    })
                  }}
                >
                  Delete Role
                </button>
              )}
            </div>

            <div className="mb-6">
              <label className="label">Name</label>
              <input
                className="textbox"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                id="name"
                disabled={selectedRole.name === '@everyone'}
              />
            </div>

            <div className="label">Color</div>
            <div className="grid grid-cols-4 gap-3 mb-10">
              {Object.keys(realColors).map(col => (
                <div
                  key={col}
                  className="h-6 rounded-md relative cursor-pointer"
                  style={{ backgroundColor: realColors[col][500] }}
                  onClick={() => {
                    if (color === realColors[col][500]) setColor(null)
                    else setColor(realColors[col][500])
                  }}
                >
                  {color === realColors[col][500] && (
                    <div className="inset-0 absolute flex items-center justify-center">
                      <IconCheck className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="label">Permissions</div>
            <div className="space-y-0.5 divide-y divide-gray-700">
              {Object.values(ServerPermission).map(permission => (
                <div key={permission} className="flex w-full py-4 text-base">
                  <div>
                    <div className="font-semibold">
                      {t(`permissions.server.${permission}.title`)}
                    </div>
                    {!!t(`permissions.server.${permission}.description`) && (
                      <div className="text-13 text-tertiary pt-1">
                        {t(`permissions.server.${permission}.description`)}
                      </div>
                    )}
                  </div>

                  <div className="pl-6 ml-auto">
                    <Switch
                      green
                      checked={permissions.includes(permission)}
                      onChange={() => {
                        if (permissions.includes(permission)) {
                          setPermissions(
                            permissions.filter(p => p !== permission)
                          )
                        } else {
                          setPermissions([...permissions, permission])
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`sticky z-50 flex items-center rounded-md shadow-lg bottom-8 max-w-screen-md w-full dark:bg-gray-800 pr-3 pl-6 h-16 transform transition ${
            madeChanges ? 'translate-y-0' : 'translate-y-24'
          }`}
        >
          <div className="text-tertiary text-sm">Changes not saved</div>
          <div className="flex items-center space-x-3 ml-auto">
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setName(selectedRole.name)
                setColor(selectedRole.color)
                setPermissions(selectedRole.permissions)
              }}
            >
              Discard Changes
            </button>
            <button
              type="button"
              disabled={!name || !madeChanges}
              className="save-button"
              onClick={() =>
                updateRole({
                  variables: {
                    input: { roleId: selectedRoleId, name, color, permissions }
                  }
                })
              }
            >
              Save Changes
              {updateRoleLoading && (
                <IconSpinner className="w-5 h-5 text-primary ml-3" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function CreateRoleDialog({
  createRoleOpen,
  setCreateRoleOpen,
  server,
  setSelectedRoleId
}) {
  const [name, setName] = useState('')
  const [createRole, { loading }] = useCreateRoleMutation({
    update(cache, { data: { createRole } }) {
      const data = cache.readQuery({ query: CurrentUserDocument })
      const clone = JSON.parse(JSON.stringify(data))
      const serv = clone.user.servers.find(s => s.id === server.id)
      serv.roles = [...server.roles, createRole]
      cache.writeQuery({ query: CurrentUserDocument, data: clone })
    }
  })

  return (
    <Dialog isOpen={createRoleOpen} close={() => setCreateRoleOpen(false)}>
      <div className="max-w-md w-full rounded-md dark:bg-gray-800 shadow-lg p-4">
        <div className="text-primary text-2xl font-semibold">Create Role</div>

        <div className="text-left">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="textbox"
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            maxLength={100}
          />
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4">
          <button
            className="cancel-button"
            type="button"
            onClick={() => setCreateRoleOpen(false)}
          >
            Cancel
          </button>
          <button
            className="save-button"
            type="button"
            disabled={!name || name === '@everyone' || loading}
            onClick={() => {
              createRole({
                variables: { input: { name, serverId: server.id } }
              }).then(({ data: { createRole } }) => {
                setCreateRoleOpen(false)
                setName('')
                setSelectedRoleId(createRole.id)
              })
            }}
          >
            Continue
            {loading && <IconSpinner className="w-5 h-5 text-primary ml-3" />}
          </button>
        </div>
      </div>
    </Dialog>
  )
}
