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
      <div
        onClick={e => {
          e.stopPropagation()
          setOpen(true)
        }}
        className="mt-2 cursor-pointer flex relative justify-center aspect-w-16 aspect-h-9 rounded-lg dark:bg-black"
      >
        <img
          loading="lazy"
          alt="Image"
          src={post.imageUrls[current]}
          className="rounded-lg object-contain"
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
