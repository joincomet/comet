import UserAvatar from '@/components/avatars/UserAvatar'
import { useUser } from '@/components/providers/DataProvider'
import SidebarItem from '@/components/sidebars/base/SidebarItem'
import SidebarLabel from '@/components/sidebars/base/SidebarLabel'
import { IconX } from '@/lib/Icons'
import { Link } from 'react-router-dom'

export default function SettingsPage() {
  const user = useUser()
  return (
    <>
      <div className="h-full flex relative">
        <Link
          to="/posts"
          className="absolute top-4 left-4 rounded-full cursor-pointer transition dark:hover:bg-gray-700 p-3"
        >
          <IconX className="w-6 h-6 text-tertiary" />
        </Link>

        <div className="min-w-48 w-1/3 dark:bg-gray-800 flex justify-end px-4 py-12">
          <div className="w-48">
            <SidebarLabel>User Settings</SidebarLabel>
            <SidebarItem to="/settings">My Account</SidebarItem>
          </div>
        </div>
        <div className="w-2/3 px-10 py-16 dark:bg-gray-750">
          <div className="max-w-screen-sm">
            <div className="font-semibold text-primary uppercase mb-6">
              My Account
            </div>
            <div className="rounded-lg dark:bg-gray-800 p-4">
              <div className="flex items-center">
                <UserAvatar user={user} size={20} />
                <div className="flex items-end ml-6">
                  <div className="font-semibold text-xl text-primary">
                    {user.name}
                  </div>
                  <div
                    className="text-base text-tertiary"
                    style={{ marginBottom: '1px' }}
                  >
                    #{user.tag}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
