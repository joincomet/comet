import {
  IconDiscord,
  IconDownload,
  IconGithub,
  IconPatreon,
  IconTwitter
} from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { Link } from 'react-router-dom'
import {
  VectorGrass,
  VectorLogo,
  VectorTelescopeMan
} from '@/components/ui/vectors'
import { Meteors } from '@/components/ui/meteors'
import { getOS } from '@/utils/getOS'
import Page from '@/components/ui/page/Page'
import { useMemo } from 'react'
import { version } from '../../package.json'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

const container = 'relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto'
const iconButton =
  'p-3 hover:bg-gray-700 transition rounded-full cursor-pointer'

export default function LandingPage() {
  const [currentUser] = useCurrentUser()

  const os = getOS()
  const downloadLink = useMemo(() => {
    if (os === 'Windows')
      return `https://github.com/joincomet/comet/releases/download/${version}/Comet-Setup-${version}.exe`
    else if (os === 'Mac OS')
      return `https://github.com/joincomet/comet/releases/download/${version}/Comet-${version}.dmg`
    else if (os === 'Linux')
      return `https://github.com/joincomet/comet/releases/download/${version}/Comet-${version}.AppImage`
  }, [os])

  return (
    <Page>
      <div className="relative flex-grow flex flex-col items-center">
        <div
          className={`fixed top-0 left-0 right-0 z-50 bg-gray-900 transition`}
        >
          <div className="h-1 bg-gradient-to-r from-blue-500 to-red-500 w-full" />

          <div className="px-24 h-16 flex items-center">
            <VectorLogo className="h-6 text-gray-200" />

            <div className="ml-auto space-x-3 inline-flex items-center">
              <Tippy content="Comet Discord Server">
                <div className={`${iconButton}`}>
                  <IconDiscord size={20} className="text-gray-200" />
                </div>
              </Tippy>

              <Tippy content="@joincometapp on Twitter">
                <div className={iconButton}>
                  <IconTwitter size={20} className="text-gray-200" />
                </div>
              </Tippy>

              <Tippy content="Comet on GitHub">
                <div className={iconButton}>
                  <IconGithub size={20} className="text-gray-200" />
                </div>
              </Tippy>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundImage:
              'radial-gradient(ellipse at top , #18181B 0%,  #27272A 95%)'
          }}
          className="overflow-hidden py-64 w-full relative"
        >
          <div className="flex absolute bottom-0 left-0 right-0 z-10 text-gray-900">
            <VectorGrass className="w-1/2" />
            <VectorGrass className="w-1/2" />
          </div>
          <VectorTelescopeMan className="absolute bottom-0 right-32 text-gray-900 z-10 h-96" />
          <Meteors />

          <div className={container}>
            <div className="text-center flex flex-col items-center space-y-12">
              {/*<Logo className="h-16 text-gray-200" />*/}

              <h1 className="inline-flex items-center">
                <div className="text-5xl text-white font-semibold tracking-tight">
                  All-in-one chat and forums for communities.
                </div>
              </h1>
              <p className="text-white text-xl max-w-screen-md">
                The age of fragmented communities is over. Say goodbye to Reddit
                and Discord, and run your entire community on Comet.
              </p>
              <div className="inline-flex items-center space-x-6">
                <a
                  href={downloadLink}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="bg-blue-500 select-none h-12 px-6 rounded-full inline-flex items-center text-lg text-white transition transform shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  Download for {os}
                  <IconDownload className="w-6 h-6 ml-3" />
                </a>

                <Link
                  to={currentUser ? '/me' : '/login'}
                  className="border border-gray-700 select-none h-12 px-6 rounded-full inline-flex items-center text-lg text-white transition transform shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  Open in Browser
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
