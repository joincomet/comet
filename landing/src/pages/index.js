import Logo from '@/components/Logo'
import { SiDiscord, SiGithub, SiPatreon, SiTwitter } from 'react-icons/si'
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi'
import { BiRocket } from 'react-icons/bi'
import Tippy from '@tippyjs/react'
import { People } from '@/components/People'
import Particles from 'react-tsparticles'
import { MoveDirection, OutMode, ShapeType } from 'tsparticles'
import Grass from '@/components/Grass'
import Telescope from '@/components/Telescope'
import Meteors from '@/components/Meteors'

const container = 'relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto'
const iconButton =
  'p-3 hover:bg-gray-700 transition rounded-full cursor-pointer'

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="fixed right-0 top-0 left-0 z-50">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-red-500 w-full" />

        <div className="px-24 h-16 flex items-center">
          <Logo className="h-6 text-gray-200" />

          <div className="inline-flex items-center bg-red-300 text-xs ml-6 px-3 h-6 text-red-700 rounded-full">
            Coming Soon
          </div>

          <div className="ml-auto space-x-3 inline-flex items-center">
            <Tippy content="Support CometX on Patreon">
              <div className={iconButton}>
                <SiPatreon size={20} className="text-gray-200" />
              </div>
            </Tippy>

            <Tippy content="CometX Discord Server">
              <div className={`${iconButton}`}>
                <SiDiscord size={20} className="text-gray-200" />
              </div>
            </Tippy>

            <Tippy content="@cometx_io on Twitter">
              <div className={iconButton}>
                <SiTwitter size={20} className="text-gray-200" />
              </div>
            </Tippy>

            <Tippy content="CometX on GitHub">
              <div className={iconButton}>
                <SiGithub size={20} className="text-gray-200" />
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
        <Grass className="absolute bottom-0 left-0 right-0 text-gray-900 -mb-16 z-10" />
        <Telescope className="absolute bottom-0 right-32 text-gray-900 z-10 h-96" />
        <Meteors />

        <Particles
          className="absolute inset-0"
          id="tsparticles"
          options={{
            background: {
              color: {
                value: 'transparent'
              }
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: '#A1A1AA'
              },
              lineLinked: {
                enable: false
              },
              move: {
                bounce: false,
                direction: MoveDirection.none,
                enable: true,
                outMode: OutMode.out,
                random: true,
                speed: 0.3,
                straight: false
              },
              opacity: {
                anim: {
                  enable: true,
                  minimumValue: 0,
                  speed: 1,
                  sync: false
                },
                random: true,
                value: 1
              },
              shape: {
                type: ShapeType.circle
              },
              size: {
                random: true,
                value: 3
              }
            },
            detectRetina: true
          }}
        />
        <div className={container}>
          <div className="text-center flex flex-col items-center space-y-12">
            {/*<Logo className="h-16 text-gray-200" />*/}

            <h1 className="inline-flex items-center">
              <div className="text-7xl text-white font-semibold tracking-tight">
                See what's in orbit.
              </div>
            </h1>
            <p className="text-white text-xl max-w-screen-md">
              No matter who you are, CometX lets you find or create a community
              for your passions and share your thoughts and creations.
            </p>
            <div className="inline-flex items-center space-x-6">
              <a
                href="https://www.getcomet.net"
                rel="noopener"
                className="bg-blue-500 select-none h-12 px-6 rounded-full inline-flex items-center font-medium text-base text-white transition transform shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                Continue to getcomet.net
                <FiArrowRight size={20} className="ml-3" />
              </a>

              <div
                style={{ color: '#F96854', borderColor: '#F96854' }}
                className="select-none border h-12 px-6 rounded-full inline-flex items-center font-medium text-base bg-white transition transform shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <SiPatreon size={20} className="mr-3" />
                Support CometX on Patreon
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*<div className="w-full h-6 bg-gradient-to-r from-blue-500 to-red-500 mb-12" />*/}

      <div className="flex flex-col items-center my-12 z-10">
        <div className="grid grid-cols-2 gap-6 mb-12 mx-72">
          <h1 className="col-span-1 pl-24">
            <div className="text-3xl font-semibold tracking-tight mb-6">
              Explore Communities
            </div>

            <Planet className="ml-24" />
            <Planet className="ml-48 mt-6" />
            <Planet className="ml-16 mt-6" />
            <Planet className="ml-32 mt-6" />
          </h1>

          <div className="col-span-1 relative">
            <div className="text-3xl font-semibold tracking-tight mb-6">
              Join the Discussion
            </div>

            <div className="z-10 flex h-48 z-10 rounded-xl shadow-md bg-gray-800 text-white font-medium p-4 text-lg mb-6">
              <div>
                <div className="relative">
                  <img
                    src="/people/G.jpg"
                    className="rounded-full h-12 w-12 object-cover object-center"
                  />
                  <div className="w-3 h-3 rounded-full z-10 bg-green-500 absolute bottom-0 right-0 ring-4 ring-gray-800" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-sm">
                  Mahatma Ghandi <span className="text-tertiary">@Gandhi</span>
                </div>
                <div>This is a title of a post</div>
                <div className="text-sm text-secondary">Description</div>
              </div>
            </div>

            <div className="-mt-28 -mr-16 transform scale-90 origin-right flex rounded-xl shadow-2xl bg-gray-700 text-white font-medium pl-4 pr-16 pt-4 pb-9 text-lg mb-6">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src="/people/G.jpg"
                    className="rounded-full h-12 w-12 object-cover object-center "
                  />
                  <div className="w-3 h-3 rounded-full z-10 bg-green-500 absolute bottom-0 right-0 ring-4 ring-gray-700" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-sm">
                  Mahatma Ghandi <span className="text-tertiary">@Gandhi</span>
                </div>
                <div>This is a title of a post</div>

                <div className="relative mt-3 rounded-xl shadow-inner">
                  <img
                    src="/flamingo.jpg"
                    className="w-full flex-grow-0 object-cover h-64 rounded-xl shadow-inner"
                  />
                </div>

                <div className="mt-3 flex items-center -ml-3 -mr-3">
                  <div className="inline-flex items-center rounded-full px-6 h-9 text-tertiary">
                    <BiRocket size={20} className="mr-3" />
                    100
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*<h1 className="mb-6 text-3xl font-semibold tracking-tight text-center">
          Dedicated to Protecting the{' '}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Spirit of Free Speech
          </span>
        </h1>

        <div className="bg-gray-800 shadow-md rounded-xl flex font-serif text-lg mx-24 max-w-md">
          <div className="p-6">
            <p className="text-tertiary mb-1">
              Constitution of United States of America 1789 (rev. 1992)
            </p>
            <p className="italic">
              <span className="not-italic">AMENDMENT I.</span> Congress shall
              make no law respecting an establishment of religion, or
              prohibiting the free exercise thereof; or abridging the freedom of
              speech, or of the press; or the right of the people peaceably to
              assemble, and to petition the Government for a redress of
              grievances.
            </p>
          </div>
        </div>*/}
      </div>

      {/*<People />*/}
    </div>
  )
}

function Planet({ className }) {
  return (
    <div
      className={`${className} inline-flex items-center bg-gray-800 rounded-full shadow-md py-3 px-9`}
    >
      <img
        src="https://i.getcomet.net/planet/dogs/avatar.png"
        className="object-cover object-center rounded-full h-14 w-14 shadow-md ring-2 ring-blue-500"
      />
      <div className="ml-6">
        <div className="font-medium text-blue-500 cursor-pointer hover:underline">
          +Dogs
        </div>
        <div className="text-sm text-tertiary mt-1">Man's best friend.</div>
      </div>
    </div>
  )
}
