import React, { useEffect, useState } from 'react'
import { FiFolder, FiStar } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '@/lib/ItemTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'
import PostCardLayout from '@/components/post/PostCardLayout'
import PostClassicLayout from '@/components/post/PostClassicLayout'

function Post({ post, className, style, index, measure }) {
  const [toast, setToast] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)

  const layout = 'classic'

  const [{ isDragging }, dragRef, preview] = useDrag({
    item: { post, type: ItemTypes.POST },
    begin: () => {
      console.log('begin')
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
      className={`relative select-none outline-none ${className || ''}`}
      style={style}
      data-index={index}
    >
      <div
        className={`absolute inset-0 z-50 transform transition ${
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
              <div className="transform -translate-x-1/2 pr-6 h-12 dark:bg-black shadow-xl rounded-full text-medium text-sm inline-flex items-center flex-no-wrap whitespace-nowrap">
                {toast.folder && (
                  <>
                    {toast.folder.name === 'Favorites' ? (
                      <FiStar
                        className={`${
                          toast.folder.color || 'text-yellow-500'
                        } h-5 w-5 mx-6`}
                      />
                    ) : (
                      <FiFolder
                        className={`${
                          toast.folder.color || 'text-blue-500'
                        } h-5 w-5 mx-6`}
                      />
                    )}

                    {`Added to ${toast.folder.name}`}
                    <span className="hover:underline cursor-pointer ml-6 text-tertiary">
                      Undo
                    </span>
                  </>
                )}

                {toast.user && (
                  <>
                    <img
                      alt={toast.user.profile.realName}
                      className="object-cover w-12 h-12 rounded-full mr-6"
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
        {layout === 'classic' && (
          <PostClassicLayout post={post} index={index} measure={measure} />
        )}
      </div>
    </article>
  )
}

export default React.memo(Post)
