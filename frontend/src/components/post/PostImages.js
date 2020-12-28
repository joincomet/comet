import React, { useState } from 'react'
import Modal from 'react-responsive-modal'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { useRouter } from 'next/router'

const previous =
  'cursor-pointer text-white absolute z-10 left-0 top-0 bottom-0 w-10 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-25 transition'
const next =
  'cursor-pointer text-white absolute z-10 left-full transform -translate-x-full top-0 bottom-0 w-10 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-25 transition'

export default function PostImages({ post }) {
  if (!post.imageUrls || post.imageUrls.length === 0) return null

  const [current, setCurrent] = useState(0)

  const { query, pathname, push } = useRouter()

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="mt-2 cursor-pointer flex relative h-24 space-x-3 rounded-lg select-none overflow-x-auto">
        {post.imageUrls.map((image, index) => (
          <img
            key={index}
            loading="lazy"
            alt="Image"
            src={image}
            className="rounded-lg object-contain h-24 w-24"
            onClick={e => {
              e.stopPropagation()
              setCurrent(index)
              setOpen(true)
            }}
          />
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        blockScroll={false}
        closeIcon={<div />}
        animationDuration={150}
        classNames={{
          modal:
            'max-w-screen-sm w-full h-screen bg-transparent shadow-none p-0 m-0',
          overlay: 'bg-black bg-opacity-75'
        }}
      >
        <div
          onClick={e => {
            e.stopPropagation()
            setOpen(false)
          }}
          className="h-full w-full flex items-center justify-center"
        >
          <div className="relative">
            <img
              loading="lazy"
              alt="Image"
              src={post.imageUrls[current]}
              className="md:rounded-md"
            />

            {post.imageUrls.length > 1 && current < post.imageUrls.length - 1 && (
              <div
                onClick={e => {
                  e.stopPropagation()
                  setCurrent(current + 1)
                }}
                className={next}
              >
                <FiChevronRight size={20} />
              </div>
            )}

            {post.imageUrls.length > 1 && current > 0 && (
              <div
                onClick={e => {
                  e.stopPropagation()
                  setCurrent(current - 1)
                }}
                className={previous}
              >
                <FiChevronLeft size={20} />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
