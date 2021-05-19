import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/graphql/hooks'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import Dialog from '@/components/ui/dialog/Dialog'
import DialogTitle from '@/components/ui/dialog/DialogTitle'
import { IconChannel } from '@/components/ui/icons/Icons'
import Button from '@/components/ui/Button'
import Switch from '@/components/ui/Switch'
import { useTranslation } from 'react-i18next'
import { CurrentUserDocument, useCreateChannelMutation } from '@/graphql/hooks'
import { useForm } from 'react-hook-form'
import CreateChannelDialog from '@/components/channel/CreateChannelDialog'

export default function CreateChannel({ server }) {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [canManageChannels] = useHasServerPermissions({
    server,
    permissions: [ServerPermission.ManageChannels]
  })

  if (!canManageChannels) return <SidebarLabel>Channels</SidebarLabel>

  return (
    <>
      <SidebarLabel
        onClick={() => setOpen(true)}
        plusLabel={t('channel.create')}
      >
        Channels
      </SidebarLabel>

      <CreateChannelDialog open={open} setOpen={setOpen} server={server} />
    </>
  )
}
