import Sidebar from '@/components/ui/sidebar/Sidebar'
import { useStore } from '@/hooks/useStore'
import SidebarFolder from '@/components/folder/SidebarFolder'
import CreateFolder from '@/components/folder/CreateFolder'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import {
  IconChat,
  IconCreate,
  IconCreateServer,
  IconDotsHorizontal,
  IconFolder,
  IconFriends
} from '@/components/ui/icons/Icons'
import { useLoginDialog } from '@/hooks/useLoginDialog'

export default function UserFoldersSidebar() {
  const showFolders = useStore(s => s.showFolders)
  const [currentUser] = useCurrentUser()
  const userFolders = currentUser?.folders ?? []
  const [loginOpen, setLoginOpen, isCreateAccount, setCreateAccount] =
    useLoginDialog()

  return (
    <Sidebar right show={showFolders}>
      <div className="px-1.5">
        {!!currentUser ? (
          <>
            <CreateFolder />

            <div className="space-y-0.5">
              {!!userFolders &&
                userFolders.map(folder => (
                  <SidebarFolder key={folder.id} folder={folder} />
                ))}
            </div>
          </>
        ) : (
          <div className="px-1.5 py-3">
            <div className="space-y-3 text-secondary rounded p-2 shadow-inner dark:bg-gray-850">
              <div className="text-sm font-medium text-accent mb-3">
                Log in to use features
              </div>
              <div className="flex items-center text-sm font-medium">
                <div className="mr-3 rounded dark:bg-gray-900 p-1.5 flex items-center justify-center shadow-inner">
                  <IconCreateServer className="w-5 h-5 text-green-400" />
                </div>
                Join & Create Planets
              </div>
              <div className="flex items-center text-sm font-medium">
                <div className="mr-3 rounded dark:bg-gray-900 p-1.5 flex items-center justify-center shadow-inner">
                  <IconCreate className="w-5 h-5 text-blue-400" />
                </div>
                Post & Comment
              </div>
              <div className="flex items-center text-sm font-medium">
                <div className="mr-3 rounded dark:bg-gray-900 p-1.5 flex items-center justify-center shadow-inner">
                  <IconChat className="w-5 h-5 text-pink-400" />
                </div>
                Chat
              </div>
              <div className="flex items-center text-sm font-medium">
                <div className="mr-3 rounded dark:bg-gray-900 p-1.5 flex items-center justify-center shadow-inner">
                  <IconFolder className="w-5 h-5 text-red-400" />
                </div>
                Folders
              </div>
              <div className="flex items-center text-sm font-medium">
                <div className="mr-3 rounded dark:bg-gray-900 p-1.5 flex items-center justify-center shadow-inner">
                  <IconFriends className="w-5 h-5 text-purple-400" />
                </div>
                Add Friends
              </div>
              <div className="flex items-center text-sm font-medium">
                <div className="mr-3 rounded dark:bg-gray-900 p-1.5 flex items-center justify-center shadow-inner">
                  <IconDotsHorizontal className="w-5 h-5 text-mid" />
                </div>
                And Much More
              </div>
              <button
                onClick={() => {
                  setLoginOpen(true)
                  setCreateAccount(false)
                }}
                className="focus:outline-none w-full h-8 rounded cursor-pointer select-none border border-gray-750 text-blue-500 flex items-center justify-center text-sm font-medium"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setLoginOpen(true)
                  setCreateAccount(true)
                }}
                className="focus:outline-none w-full h-8 rounded cursor-pointer select-none bg-blue-600 text-white flex items-center justify-center text-sm font-medium"
              >
                Create Account
              </button>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  )
}
