import { useTranslation } from 'react-i18next'
import ServerListItem from '@/components/server/list/ServerListItem'
import { IconCreateServer } from '@/components/ui/icons/IconCreateServer'
import CreateServerDialog from '@/components/server/create/CreateServerDialog'
import { useState } from 'react'

export default function CreateServerButton() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <>
      <ServerListItem
        name={t('server.create.title')}
        onClick={() => setOpen(true)}
        className="dark:bg-gray-800 bg-white hover:bg-purple-600 dark:hover:bg-purple-600"
      >
        <IconCreateServer
          className={`w-5 h-5 text-purple-500 group-hover:text-white transition`}
        />
      </ServerListItem>

      <CreateServerDialog open={open} setOpen={setOpen} />
    </>
  )
}
