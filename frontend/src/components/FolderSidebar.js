import { SiDiscord, SiPatreon, SiTwitter, SiGithub } from 'react-icons/si'

export default function FolderSidebar() {
  const link =
    'rounded-full inline-flex place-items-center h-10 w-10 bg-gray-100 bg-gray-800 transition dark:hover:bg-gray-700 hover:bg-gray-200 transform ease-in-out duration-200 hover:scale-110'
  return (
    <>
      <nav
        className="fixed right-0 top-0 z-20 flex flex-col overflow-y-auto bg-white dark:bg-gray-800 shadow-lg min-h-full h-full hidden sm:block"
        style={{ width: '17.5rem' }}
      >
        <div className="flex flex-col flex-grow items-center py-5 border-b border-gray-200 dark:border-gray-700 mx-4">
          <img
            className="rounded-full bg-indigo-500 w-24 h-24 border-2 border-blue-500"
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

        <div className="flex items-center justify-between mx-5 mt-5">
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
      </nav>
    </>
  )
}
