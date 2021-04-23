import Popup from '@/components/ui/Popup'
import UserAvatar from '@/components/user/UserAvatar'
import { useStore } from '@/hooks/useStore'

export default function UserPopup({
  user,
  nickname,
  roles = [],
  children,
  placement = 'right'
}) {
  const setDialogUser = useStore(s => s.setDialogUser)
  return (
    <>
      <Popup
        className="w-64"
        placement={placement}
        render={close => (
          <div className="w-full relative rounded-md shadow-lg dark:bg-gray-850 duration-200 transform transition p-3 flex flex-col items-center z-50 w-64">
            <div className="group relative">
              <UserAvatar
                user={user}
                size={20}
                showOnline
                className="dark:bg-gray-700 cursor-pointer select-none"
                dotClassName="ring-5 w-4 h-4 dark:ring-gray-850"
              />

              <div
                onClick={() => {
                  close()
                  setDialogUser(user)
                }}
                className="cursor-pointer bg-black bg-opacity-50 transition rounded-full absolute whitespace-nowrap inset-0 flex items-center justify-center text-9 uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100"
              >
                View Profile
              </div>
            </div>

            <div className="mt-3 text-base">
              <span className="font-semibold text-primary">
                {nickname || user.name}
              </span>
              {!nickname && <span className="text-tertiary">#{user.tag}</span>}
            </div>

            {nickname && (
              <div className="text-13 text-tertiary font-semibold">
                {user.name}
              </div>
            )}
          </div>
        )}
      >
        {children}
      </Popup>
    </>
  )
}
