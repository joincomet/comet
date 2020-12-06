import { AnimatePresence, motion } from 'framer-motion'
import { FiFolder, FiStar } from 'react-icons/fi'
import Image from 'next/image'
import React from 'react'

export default function PostToast({ toast }) {
  return (
    <div
      className={`absolute inset-x-0 top-1/2 z-50 -translate-y-1/2 transform transition overflow-hidden ${
        toast ? 'translate-x-0' : '-translate-x-full delay-150'
      }`}
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{
              opacity: 0,
              x: 0
            }}
            animate={{
              opacity: 1,
              x: '50%'
            }}
            exit={{
              opacity: 0,
              x: '100%'
            }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
          >
            <div
              style={{ backgroundColor: toast.folder.color || '#3b82f6' }}
              className={`transform -translate-x-1/2 pr-6 h-12 shadow-xl rounded-md text-medium text-sm inline-flex items-center flex-nowrap whitespace-nowrap`}
            >
              {toast.folder && (
                <>
                  <div className="w-9 h-9 bg-gray-800 mx-4 rounded-full inline-flex items-center shadow">
                    {toast.folder.name === 'Favorites' ? (
                      <FiStar
                        style={{ color: toast.folder.color || '#eab308' }}
                        className={`h-5 w-5 m-auto`}
                      />
                    ) : (
                      <FiFolder
                        style={{ color: toast.folder.color || '#3b82f6' }}
                        className={`h-5 w-5 m-auto`}
                      />
                    )}
                  </div>

                  <span className="text-black">{`Added to ${toast.folder.name}`}</span>

                  <span className="hover:underline cursor-pointer ml-6 text-black">
                    Undo
                  </span>
                </>
              )}

              {toast.user && (
                <>
                  <Image
                    loading="eager"
                    width={36}
                    height={36}
                    alt={toast.user.profile.realName}
                    className="object-cover w-9 h-9 rounded-full mx-4 shadow"
                    src={toast.user.avatarURL}
                  />
                  {`Sent to ${toast.user.profile.realName}`}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
