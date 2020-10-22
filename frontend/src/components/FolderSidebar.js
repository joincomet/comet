import { SiDiscord, SiPatreon, SiTwitter, SiGithub } from 'react-icons/si'
import {
  FiFolder,
  FiFolderPlus,
  FiStar,
  FiUsers,
  FiUserPlus
} from 'react-icons/fi'
import { Droppable } from 'react-beautiful-dnd'
import Tippy from '@tippyjs/react';

export default function FolderSidebar() {
  const link =
    'rounded-full inline-flex place-items-center h-10 w-10 bg-gray-100 bg-gray-800 transition dark:hover:bg-gray-700 hover:bg-gray-200 transform ease-in-out duration-200 hover:scale-125'
  return (
    <>
      <nav
        className="fixed top-0 right-0 z-20 flex flex-col hidden h-full min-h-full overflow-y-auto bg-white shadow-lg dark:bg-gray-800 sm:block"
        style={{ width: '17.5rem' }}
      >
        <div className="flex flex-col items-center flex-grow py-5 mx-4 border-b border-gray-200 dark:border-gray-700">
          <img
            className="w-24 h-24 transition duration-150 ease-in-out transform bg-indigo-500 border-2 border-blue-500 rounded-full cursor-pointer hover:scale-105"
            src="https://pbs.twimg.com/profile_images/1312166598086598658/I2-2CTFg_400x400.jpg"
          />
          <div className="inline-flex items-center mt-3 text-lg font-semibold">
            Dan Beneventano
            <span className="flex w-3 h-3 ml-3 cursor-pointer">
              <span className="absolute inline-flex w-3 h-3 p-1 bg-green-500 rounded-full opacity-75 animate-online" />
              <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full" />
            </span>
          </div>
          <div className="font-medium mt-0.5 text-tertiary text-sm ">@Dan</div>
        </div>

        <div className="flex items-center justify-between px-1 pb-3 mx-5 mt-3 border-b dark:border-gray-700">
          <a
            href="https://discord.gg/NPCMGSm"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            <SiDiscord
              className="w-5 h-5 mx-auto"
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
              className="w-5 h-5 mx-auto"
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
              className="w-5 h-5 mx-auto"
              style={{ color: '#1DA1F2' }}
            />
          </a>
          <a
            href="https://github.com/comet-app/cometx"
            target="_blank noreferrer"
            rel="noopener"
            className={link}
          >
            <SiGithub className="w-5 h-5 mx-auto text-black dark:text-white" />
          </a>
        </div>

        <div className="mt-6">
          <div className="mx-5 mb-3 font-bold tracking-widest uppercase text-tiny text-tertiary">
            FOLDERS
          </div>
          <Droppable droppableId="folders">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                <div className="flex flex-row items-center h-12 px-6 transition duration-150 ease-in-out rounded cursor-pointer text-secondary dark:hover:bg-gray-700">
                  <FiStar className="w-5 h-5 text-yellow-500" />
                  <span className="ml-6 text-sm font-medium">Favorites</span>
                </div>

                <div className="flex flex-row items-center h-12 px-6 transition duration-150 ease-in-out rounded cursor-pointer text-secondary dark:hover:bg-gray-700">
                  <FiFolder className="w-5 h-5 text-blue-500" />
                  <span className="ml-6 text-sm font-medium">Read Later</span>
                </div>

                <div className="flex flex-row items-center h-12 px-6 transition duration-150 ease-in-out rounded cursor-pointer text-secondary dark:hover:bg-gray-700">
                  <FiFolder className="w-5 h-5 text-green-500" />
                  <span className="ml-6 text-sm font-medium">
                    Best Posts Ever
                  </span>
                  <Tippy content="Shared folder">
                    <FiUsers className="w-4 h-4 ml-auto text-tertiary" />
                  </Tippy>
                </div>
              </div>
            )}
          </Droppable>

          <div className="flex flex-row items-center h-12 px-6 transition duration-150 ease-in-out rounded cursor-pointer text-tertiary dark:hover:bg-gray-700">
            <FiFolderPlus className="w-5 h-5" />
            <span className="ml-6 text-sm font-medium">New Folder</span>
          </div>

          <div className="mx-5 mt-6 mb-3 font-bold tracking-widest uppercase text-tiny text-tertiary">
            DIRECT MESSAGES
          </div>
          <Droppable droppableId="directmessages">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                <div className="flex flex-row items-center h-12 px-6 transition duration-150 ease-in-out rounded cursor-pointer text-secondary dark:hover:bg-gray-700">
                  <img
                    className="object-cover w-8 h-8 rounded-full"
                    src="https://pbs.twimg.com/profile_images/1278741528425517057/oQbjgrA2_400x400.jpg"
                  />
                  <span className="ml-6 text-sm font-medium">
                    Michael Perino
                  </span>
                </div>
              </div>
            )}
          </Droppable>

          <div className="flex flex-row items-center h-12 px-6 transition duration-150 ease-in-out rounded cursor-pointer text-tertiary dark:hover:bg-gray-700">
            <FiUserPlus className="w-8 h-8 p-1" />
            <span className="ml-6 text-sm font-medium">New Direct Message</span>
          </div>
        </div>
      </nav>
    </>
  )
}
