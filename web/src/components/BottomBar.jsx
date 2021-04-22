import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import UserAvatar from '@/components/user/UserAvatar'
import { IconBell, IconFolder, IconSearch } from '@/components/ui/icons/Icons'

export default function BottomBar() {
  const [currentUser] = useCurrentUser()

  return (
    <div className="flex items-center px-5 bottom-0 h-5.5 bg-gray-650 z-50">
      <UserAvatar size={4.5} className="mr-2" user={currentUser} />
      <div className="dark:text-white text-sm">{currentUser.name}</div>
      <div className="w-2 h-2 rounded-full bg-green-500 ml-2" />
      <div className="ml-auto flex items-center space-x-3 text-primary">
        <IconSearch className="w-4.5 h-4.5 cursor-pointer" />
        <IconFolder className="w-4.5 h-4.5 cursor-pointer" />
        <IconBell className="w-4.5 h-4.5 cursor-pointer" />
      </div>
    </div>
  )
}
