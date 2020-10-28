import React, { useEffect, useState } from 'react'
import { FiFolder, FiStar } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '@/ItemTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'
import PostCardLayout from '@/components/post/PostCardLayout'
import PostClassicLayout from '@/components/post/PostClassicLayout'
import PostSmallCardLayout from '@/components/post/PostSmallCardLayout'

function Post({ post, className, style, index, measure, layout }) {
  const [toast, setToast] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)

  const [{ isDragging }, dragRef, preview] = useDrag({
    item: { post, type: ItemTypes.POST },
    begin: () => {
      document.body.classList.add('cursor-grabbing')
    },
    end: (item, monitor) => {
      document.body.classList.remove('cursor-grabbing')
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        setToast({
          post: item.post,
          folder: dropResult.folder,
          user: dropResult.user
        })
        if (timeoutId) clearTimeout(timeoutId)
        setTimeoutId(setTimeout(() => setToast(null), 1500))
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  useEffect(() => preview(getEmptyImage(), { captureDraggingState: true }), [])

  return (
    <article
      ref={dragRef}
      className={`${layout === 'cards' && 'pb-2 sm:pb-5'} ${
        layout === 'small_cards' && 'pb-2'
      } ${layout === 'classic' && 'pb-2 sm:pb-3'} select-none outline-none ${
        className || ''
      }`}
      style={style}
      data-index={index}
    >
      <div className="relative">
        <div
          className={`absolute inset-x-0 top-1/2 z-50 -translate-y-1/2 transform transition ${
            toast ? 'translate-x-0' : '-translate-x-full delay-150'
          }`}
        >
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{
                  scale: 0.75,
                  opacity: 0,
                  x: 0
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: '50%'
                }}
                exit={{
                  scale: 0.75,
                  opacity: 0,
                  x: '100%'
                }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
              >
                <div
                  className={`bg-${
                    toast.folder.color || 'blue-500'
                  } transform -translate-x-1/2 pr-6 h-12 shadow-xl rounded-md text-medium text-sm inline-flex items-center flex-nowrap whitespace-nowrap`}
                >
                  {toast.folder && (
                    <>
                      <div className="w-9 h-9 bg-gray-800 mx-4 rounded-full inline-flex items-center shadow">
                        {toast.folder.name === 'Favorites' ? (
                          <FiStar
                            className={`text-${
                              toast.folder.color || 'yellow-500'
                            } h-5 w-5 m-auto`}
                          />
                        ) : (
                          <FiFolder
                            className={`text-${
                              toast.folder.color || 'blue-500'
                            } h-5 w-5 m-auto`}
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
                      <img
                        alt={toast.user.profile.realName}
                        className="object-cover w-9 h-9 rounded-full mx-4 shadow"
                        src={toast.user.profile.avatarURL}
                      />
                      {`Sent to ${toast.user.profile.realName}`}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${
            isDragging || toast ? 'opacity-40' : 'opacity-100'
          } duration-150 transition ease-in-out`}
        >
          {layout === 'cards' && (
            <PostCardLayout post={post} index={index} measure={measure} />
          )}
          {layout === 'small_cards' && (
            <PostSmallCardLayout post={post} index={index} measure={measure} />
          )}
          {layout === 'classic' && (
            <PostClassicLayout post={post} index={index} measure={measure} />
          )}
        </div>
      </div>
    </article>
  )
}

export default React.memo(Post)
