import Popup from '@/components/ui/Popup'
import UserAvatar from '@/components/user/UserAvatar'
import { useStore } from '@/hooks/useStore'
import { IconPlus } from '@/components/ui/icons/Icons'

export default function UserPopup({
  user,
  roles,
  children,
  placement = 'right'
}) {
  const setDialogUserId = useStore(s => s.setDialogUserId)
  return (
    <>
      <Popup
        className="w-64"
        placement={placement}
        render={close => (
          <div className="w-full relative rounded-md shadow-lg duration-200 transform transition z-50 w-64">
            <div className="p-3 flex flex-col items-center dark:bg-gray-850 rounded-t-md">
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
                    setDialogUserId(user.id)
                  }}
                  className="cursor-pointer bg-black bg-opacity-50 transition rounded-full absolute whitespace-nowrap inset-0 flex items-center justify-center text-9 uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100"
                >
                  View Profile
                </div>
              </div>

              <div className="mt-3 text-base">
                <span className="font-semibold text-primary">
                  {user.username}
                </span>
              </div>
            </div>

            <div className="p-4 dark:bg-gray-800 rounded-b-md">
              {roles && (
                <div>
                  <div className="text-11 font-semibold uppercase tracking-widest text-secondary pb-2">
                    Roles
                  </div>
                  <div className="flex space-x-1">
                    {roles.map(role => (
                      <div
                        key={role.id}
                        style={{ color: role.color, borderColor: role.color }}
                        className={`text-xs font-medium px-2 h-5.5 rounded-full border inline-flex items-center ${
                          role.color
                            ? ''
                            : 'dark:border-gray-700 text-secondary'
                        }`}
                      >
                        {role.name}
                      </div>
                    ))}

                    <div className="text-xs font-medium h-5.5 w-5.5 rounded-full border inline-flex items-center justify-center dark:border-gray-700 text-secondary">
                      <IconPlus className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      >
        {children}
      </Popup>
    </>
  )
}
