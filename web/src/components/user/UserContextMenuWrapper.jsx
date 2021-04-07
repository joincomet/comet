import { ContextMenuType } from '@/types/ContextMenuType'
import UserContextMenu from '@/components/user/UserContextMenu'
import { ContextMenuWrapper } from '@/components/ui/context'
import { useEffect, useState } from 'react'
import UserDialog from '@/components/user/UserDialog'

export default function UserContextMenuWrapper() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [user, setUser] = useState(null)
  return (
    <>
      <UserDialog user={user} open={dialogOpen} setOpen={setDialogOpen} />

      <ContextMenuWrapper id={ContextMenuType.User}>
        <UserContextMenu
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          setDialogUser={setUser}
        />
      </ContextMenuWrapper>
    </>
  )
}
