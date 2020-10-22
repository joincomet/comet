import { SiDiscord, SiPatreon, SiTwitter, SiGithub } from 'react-icons/si'
import {
  FiFolder,
  FiFolderPlus,
  FiStar,
  FiUsers,
  FiUserPlus
} from 'react-icons/fi'
import { Droppable } from 'react-beautiful-dnd'

export default function FolderSidebar() {
  const link =
    'rounded-full inline-flex place-items-center h-10 w-10 bg-gray-100 bg-gray-800 transition dark:hover:bg-gray-700 hover:bg-gray-200 transform ease-in-out duration-200 hover:scale-125'
  return (
    <>
      <nav
        className="fixed right-0 top-0 z-20 flex flex-col overflow-y-auto bg-white dark:bg-gray-800 shadow-lg min-h-full h-full hidden sm:block"
        style={{ width: '17.5rem' }}
      >
        <div className="flex flex-col flex-grow items-center py-5 border-b border-gray-200 dark:border-gray-700 mx-4">
          <img
            className="rounded-full bg-indigo-500 w-24 h-24 border-2 border-blue-500 hover:scale-105 transform transition duration-150 ease-in-out cursor-pointer"
            src="https://pbs.twimg.com/profile_images/1312166598086598658/I2-2CTFg_400x400.jpg"
          />
          <div className="font-semibold mt-3 text-lg inline-flex items-center">
            Dan Beneventano
            <span className="flex h-3 w-3 ml-3 cursor-pointer">
              <span className="animate-online absolute inline-flex h-3 w-3 p-1 rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
          </div>
          <div className="font-medium mt-0.5 text-tertiary text-sm ">@Dan</div>
        </div>

        <div className="flex items-center justify-between mx-5 px-1 mt-3 pb-3 border-b dark:border-gray-700">
          <a
            href="https://discord.gg/NPCMGSm"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            <SiDiscord
              className="mx-auto w-5 h-5"
              style={{ color: '#7289DA' }}
            />
          </a>
          <a
            href="https://www.patreon.com/cometx"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            <SiPatreon
              className="mx-auto w-5 h-5"
              style={{ color: '#F96854' }}
            />
          </a>
          <a
            href="https://twitter.com/CometX_io"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            <SiTwitter
              className="mx-auto w-5 h-5"
              style={{ color: '#1DA1F2' }}
            />
          </a>
          <a
            href="https://github.com/comet-app/cometx"
            target="_blank noreferrer"
            rel="noopener"
            className={link}
          >
            <SiGithub className="mx-auto w-5 h-5 dark:text-white text-black" />
          </a>
        </div>

        <Droppable droppableId="folders">
          {(provided, snapshot) => (
            <div className="mt-6" ref={provided.innerRef}>
              <div className="mx-5 mb-3 text-tiny text-tertiary font-bold uppercase tracking-widest">
                FOLDERS
              </div>
              <div>
                <div className="flex flex-row items-center text-secondary cursor-pointer transition duration-150 ease-in-out dark:hover:bg-gray-700 h-12 px-6 rounded">
                  <FiStar className="w-5 h-5 text-yellow-500" />
                  <span className="ml-6 text-sm font-medium">Favorites</span>
                </div>

                <div className="flex flex-row items-center text-secondary cursor-pointer transition duration-150 ease-in-out dark:hover:bg-gray-700 h-12 px-6 rounded">
                  <FiFolder className="w-5 h-5 text-blue-500" />
                  <span className="ml-6 text-sm font-medium">Read Later</span>
                </div>

                <div className="flex flex-row items-center text-secondary cursor-pointer transition duration-150 ease-in-out dark:hover:bg-gray-700 h-12 px-6 rounded">
                  <FiUsers className="w-5 h-5 text-green-500" />
                  <span className="ml-6 text-sm font-medium">
                    Best Posts Ever
                  </span>
                </div>

                <div className="flex flex-row items-center text-tertiary cursor-pointer transition duration-150 ease-in-out dark:hover:bg-gray-700 h-12 px-6 rounded">
                  <FiFolderPlus className="w-5 h-5" />
                  <span className="ml-6 text-sm font-medium">New Folder</span>
                </div>
              </div>

              <div className="mx-5 mb-3 mt-6 text-tiny text-tertiary font-bold uppercase tracking-widest">
                DIRECT MESSAGES
              </div>
              <div>
                <div className="flex flex-row items-center text-secondary cursor-pointer transition duration-150 ease-in-out dark:hover:bg-gray-700 h-12 px-6 rounded">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src="https://pbs.twimg.com/profile_images/1278741528425517057/oQbjgrA2_400x400.jpg"
                  />
                  <span className="ml-6 text-sm font-medium">
                    Michael Perino
                  </span>
                </div>
                <div className="flex flex-row items-center text-tertiary cursor-pointer transition duration-150 ease-in-out dark:hover:bg-gray-700 h-12 px-6 rounded">
                  <FiUserPlus className="h-8 w-8 p-1" />
                  <span className="ml-6 text-sm font-medium">
                    New Direct Message
                  </span>
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </nav>
    </>
  )
}
