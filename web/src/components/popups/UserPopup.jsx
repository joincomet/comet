import Popup from '@/components/popups/base/Popup'
import UserAvatar from '@/components/avatars/UserAvatar'

export default function UserPopup({ user, children, placement = 'right' }) {
  return (
    <Popup
      className="w-64"
      placement={placement}
      render={
        <div className="w-full relative rounded-md shadow-lg dark:bg-gray-850 duration-200 transform transition p-3 flex flex-col items-center z-50 w-64">
          <div className="group relative">
            <UserAvatar
              user={user}
              size={20}
              showOnline
              className="dark:bg-gray-700 cursor-pointer select-none"
              dotClassName="ring-5 w-4 h-4 dark:ring-gray-850"
            />

            <div className="cursor-pointer bg-black bg-opacity-50 transition rounded-full absolute whitespace-nowrap inset-0 flex items-center justify-center text-9 uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100">
              View Profile
            </div>
          </div>

          <div className="mt-3 text-base">
            <span className="font-semibold text-primary">{user.name}</span>
            <span className="text-tertiary">#{user.tag}</span>
          </div>
        </div>
      }
    >
      {children}
    </Popup>
  )
}
