import StyledDialog from '@/components/ui/dialog/StyledDialog'
import {
  IconCheck,
  IconDelete,
  IconSettings,
  IconSpinner
} from '@/components/ui/icons/Icons'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/client'
import {
  CurrentUserDocument,
  ServerDocument,
  ServerPermission,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation
} from '@/graphql/hooks'
import { realColors } from '@/utils/colorsMap'
import Switch from '@/components/ui/Switch'
import { AnimatePresence, motion } from 'framer-motion'
import { HiPlus } from 'react-icons/hi'
import Tippy from '@tippyjs/react'

export default function ManageRolesDialog({ open, setOpen, server }) {
  const { t } = useTranslation()
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
  const [deleteRole] = useDeleteRoleMutation({
    update(cache, { data: { deleteRole } }) {
      cache.writeQuery({
        query: ServerDocument,
        variables: {
          name: server.name
        },
        data: {
          server: {
            ...server,
            roles: server.roles.filter(r => r.id !== deleteRole)
          }
        }
      })
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

  const close = () => {
    setOpen(false)
  }

  const orderedPermissions = [
    ServerPermission.SendMessages,
    ServerPermission.RestrictedChannels,
    ServerPermission.PrivateChannels,
    ServerPermission.ManageChannels,
    ServerPermission.ManageServer,
    ServerPermission.ManagePosts,
    ServerPermission.ManageComments,
    ServerPermission.DisplayRoleSeparately,
    ServerPermission.Admin
  ]

  const [isAddingRole, setIsAddingRole] = useState(false)
  const [newRoleName, setNewRoleName] = useState('')
  const [createRole, { loading: createRoleLoading }] = useCreateRoleMutation({
    update(cache, { data: { createRole } }) {
      cache.writeQuery({
        query: ServerDocument,
        variables: {
          name: server.name
        },
        data: {
          server: {
            ...server,
            roles: [createRole, ...server.roles]
          }
        }
      })
    }
  })

  const doCreateRole = () => {
    if (!newRoleName) {
      setIsAddingRole(false)
      return
    }
    createRole({
      variables: { input: { serverId: server.id, name: newRoleName } }
    }).then(res => {
      setNewRoleName('')
      setIsAddingRole(false)
      setSelectedRoleId(res.data.createRole.id)
    })
  }

  return (
    <StyledDialog open={open} close={close} closeOnOverlayClick large>
      <div className="flex">
        <div className="h-[40rem] max-h-screen w-60 dark:bg-gray-750 rounded-l-lg space-y-0.5 overflow-y-auto scrollbar-custom p-1.5">
          {isAddingRole ? (
            <div className="relative py-1 px-1.5">
              <input
                className="form-input-password"
                placeholder="Name"
                autoFocus
                value={newRoleName}
                onChange={e => setNewRoleName(e.target.value)}
                onKeyDown={e => {
                  if (e.code === 'Enter' && !!name) doCreateRole()
                }}
                type="text"
                maxLength={100}
              />
              {createRoleLoading ? (
                <IconSpinner className="form-show-password-button" />
              ) : (
                <IconCheck
                  onClick={doCreateRole}
                  className="form-show-password-button"
                />
              )}
            </div>
          ) : (
            <SidebarItem light onClick={() => setIsAddingRole(true)}>
              Add Role
              <HiPlus className="w-5 h-5 ml-auto" />
            </SidebarItem>
          )}

          {server?.roles.map(role => (
            <SidebarItem
              key={role.id}
              light
              active={selectedRoleId === role.id}
              onClick={() => setSelectedRoleId(role.id)}
            >
              <span style={{ color: role.color }}>{role.name}</span>
              {!role.isDefault && (
                <Tippy content="Delete Role">
                  <div
                    onClick={() => {
                      deleteRole({ variables: { input: { roleId: role.id } } })
                      if (selectedRoleId === role.id) {
                        setSelectedRoleId(server.roles.find(r => r.isDefault))
                      }
                    }}
                    className="group-hover:visible invisible ml-auto highlightable"
                  >
                    <IconDelete className="w-4 h-4" />
                  </div>
                </Tippy>
              )}
            </SidebarItem>
          ))}
        </div>

        <div className="relative py-5 px-7 w-full h-[40rem] overflow-y-auto max-h-screen scrollbar-thin dark:scrollbar-thumb-gray-850 scrollbar-track-transparent scrollbar-thumb-rounded-md rounded-tr-lg">
          <div className="flex items-center justify-between pb-5">
            <div className="text-primary text-base font-semibold">
              Edit Role - {selectedRole.name}
              {!!selectedRole?.isDefault && ' (Default)'}
            </div>

            {/*<button
              type="button"
              className="form-button-delete"
              disabled
              onClick={() => {
                const cache = apolloClient.cache
                const data = cache.readQuery({ query: CurrentUserDocument })
                const clone = JSON.parse(JSON.stringify(data))
                const serv = clone.user.servers.find(s => s.id === server.id)
                serv.roles = serv.roles.filter(c => c.id !== selectedRoleId)
                cache.writeQuery({
                  query: CurrentUserDocument,
                  data: clone
                })
                setSelectedRoleId(server.roles.find(r => r.isDefault)?.id)
                deleteRole({
                  variables: { input: { roleId: selectedRoleId } }
                })
              }}
            >
              Delete Role
            </button>*/}
          </div>

          <div className="mb-6">
            <label className="label">Name</label>
            <input
              className="form-input"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              id="name"
            />
          </div>

          <div className="label">Color</div>
          <div className="grid grid-cols-4 gap-2 mb-10 w-60">
            {Object.keys(realColors).map(col => (
              <div
                key={col}
                className="h-6 rounded relative cursor-pointer"
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
            {orderedPermissions.map(permission => (
              <div
                key={permission}
                className={`flex w-full py-4 text-base cursor-pointer ${
                  permissions.includes(ServerPermission.Admin) &&
                  permission !== ServerPermission.Admin
                    ? 'opacity-50'
                    : ''
                }`}
                onClick={() => {
                  if (
                    permissions.includes(ServerPermission.Admin) &&
                    permission !== ServerPermission.Admin
                  )
                    return
                  if (permissions.includes(permission)) {
                    setPermissions(permissions.filter(p => p !== permission))
                  } else {
                    setPermissions([...permissions, permission])
                  }
                }}
              >
                <div>
                  <div className="font-medium">
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
                    disabled={
                      permissions.includes(ServerPermission.Admin) &&
                      permission !== ServerPermission.Admin
                    }
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

          <div className="h-16" />

          <AnimatePresence>
            {!!madeChanges && (
              <motion.div
                initial={{
                  y: '500px'
                }}
                animate={{
                  y: 0
                }}
                exit={{
                  y: '500px'
                }}
                transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.15 }}
                className={`sticky z-50 flex items-center rounded-lg shadow-lg bottom-0 w-full dark:bg-gray-725 pr-3 pl-6 h-14 transform transition ${
                  madeChanges ? '' : ''
                }`}
              >
                <div className="text-secondary text-sm">Changes not saved</div>
                <div className="flex items-center space-x-3 ml-auto">
                  <button
                    type="button"
                    className="form-button-cancel"
                    onClick={() => {
                      setName(selectedRole.name)
                      setColor(selectedRole.color)
                      setPermissions(selectedRole.permissions)
                    }}
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    disabled={!name || !madeChanges || updateRoleLoading}
                    className="form-button-submit"
                    onClick={() =>
                      updateRole({
                        variables: {
                          input: {
                            roleId: selectedRoleId,
                            name,
                            color,
                            permissions
                          }
                        }
                      })
                    }
                  >
                    Save
                    {updateRoleLoading && (
                      <IconSpinner className="w-5 h-5 text-primary ml-3" />
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </StyledDialog>
  )
}
