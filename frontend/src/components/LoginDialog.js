import { FiX } from 'react-icons/fi'
import { useRouter } from 'next/router'
import SignUpForm from './SignUpForm'
import { motion } from 'framer-motion'

export default function LoginDialog() {
  const router = useRouter()

  return (
    <div
      className={`fixed left-0 right-0 z-50 flex flex-col px-0 top-10 bottom-10 transform${
        router.asPath === '/login'
          ? ''
          : ' -translate-x-full opacity-0 transition delay-400'
      }`}
      style={{ height: 'calc(100% - 5rem)' }}
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          ease: 'easeInOut',
          duration: '300ms',
          transitionEnd: {
            display: 'none'
          }
        }}
      >
        <div
          className="absolute left-0 right-0 -top-12 -bottom-12 bg-opacity-75 bg-gray-900"
          onClick={() =>
            router.pathname === '/login'
              ? router.push('/')
              : router.push(router.pathname)
          }
        />
      </motion.div>

      <motion.div>
        <div className="relative z-10 w-full h-full max-w-5xl m-auto bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
          <div
            className="absolute p-1 transition duration-150 ease-in-out rounded-full cursor-pointer top-4 right-4 hover:bg-gray-100"
            onClick={() =>
              router.pathname === '/login'
                ? router.push('/')
                : router.push(router.pathname)
            }
          >
            <FiX className="w-6 h-6 text-gray-300" />
          </div>
          <div className="grid h-full grid-cols-12">
            <div className="hidden h-full col-span-4 sm:flex bg-gradient-to-br to-red-400 from-indigo-500 rounded-l-xl">
              <div className="m-auto h-2/3">
                <img
                  src="/logos/logo_white_noio_nogradient.svg"
                  className="h-8"
                />
                <div className="text-xl text-center text-white font-base mt-7">
                  See what's in orbit.
                </div>
              </div>
            </div>
            <div className="flex h-full col-span-12 px-5 sm:px-0 sm:col-span-8 rounder-r-xl">
              <div className="m-auto space-y-7 h-2/3">
                <div className="flex flex-col items-center pb-5 sm:hidden">
                  <img src="/logos/logo_black_noio.svg" className="h-8" />
                  <div className="text-xl text-center text-black font-base mt-7">
                    See what's in orbit.
                  </div>
                </div>

                <h1 className="hidden text-2xl font-medium sm:block">
                  Welcome to CometX.
                </h1>

                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
