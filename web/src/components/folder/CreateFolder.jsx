import { useEffect, useState } from 'react'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/types/ServerPermission'
import { CREATE_FOLDER } from '@/graphql/mutations'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import Dialog from '@/components/ui/dialog/Dialog'
import DialogTitle from '@/components/ui/dialog/DialogTitle'
import Button from '@/components/ui/Button'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'

export default function CreateFolder({ serverId }) {
  const { t } = useTranslation()

  const [canManagePosts] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.ManagePosts]
  })

  const [isOpen, setIsOpen] = useState(false)

  const { handleSubmit, register, reset, watch } = useForm()

  const name = watch('name')

  useEffect(() => {
    if (!isOpen) return
    reset()
  }, [isOpen, reset])

  const [{ fetching }, createFolder] = useMutation(CREATE_FOLDER)

  const onSubmit = ({ name }) => {
    createFolder({ name, serverId }).then(({ data: { createFolder } }) => {
      setIsOpen(false)
    })
  }

  const server = useJoinedServers().find(s => s.id === serverId)

  const title = serverId
    ? t('folder.server.title', { name: server?.name })
    : t('folder.user.title')
  const create = serverId ? t('folder.server.create') : t('folder.user.create')

  if (!canManagePosts) return <SidebarLabel>{title}</SidebarLabel>

  return (
    <>
      <SidebarLabel onClick={() => setIsOpen(true)} plusLabel={create}>
        {title}
      </SidebarLabel>

      <Dialog
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        closeOnOverlayClick
      >
        <div
          className="rounded-lg dark:bg-gray-750 p-4 max-w-md w-full"
          onClick={e => e.stopPropagation()}
        >
          <DialogTitle className="title mb-4">{create}</DialogTitle>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 w-full">
              <label className="label" htmlFor="name">
                {t('folder.name')}
              </label>

              <input
                {...register('name', {
                  required: true,
                  maxLength: 300
                })}
                maxLength={300}
                className="textbox px-3"
                id="name"
              />
            </div>

            <Button
              loading={fetching}
              disabled={name === 'Read Later' || name === 'Favorites'}
            >
              {t('continue')}
            </Button>
          </form>
        </div>
      </Dialog>
    </>
  )
}
