import Image from 'next/image'
import React, { useState } from 'react'
import Modal from 'react-responsive-modal'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'

const previous =
  'cursor-pointer text-white absolute z-10 left-0 top-0 bottom-0 w-10 flex items-center justify-center bg-black bg-opacity-50 transition hover:bg-opacity-75'
const next =
  'cursor-pointer text-white absolute z-10 left-full transform -translate-x-full top-0 bottom-0 w-10 flex items-center justify-center bg-black bg-opacity-50 transition hover:bg-opacity-75'

export default function PostImages({ post }) {
  if (!post.imageUrls || post.imageUrls.length === 0) return null

  const [open, setOpen] = useState(false)

  const [current, setCurrent] = useState(0)

  return (
    <>
      <div
        onClick={e => {
          e.stopPropagation()
          setOpen(true)
        }}
        className="mt-2 cursor-pointer relative aspect-w-16 aspect-h-9 w-full rounded"
      >
        <Image
          loading="eager"
          alt="Image"
          layout="fill"
          src={post.imageUrls[current]}
          objectFit="cover"
          className="rounded"
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
        classNames={{
          modal:
            'max-w-screen-sm w-full h-screen bg-transparent shadow-none p-0 m-0',
          overlay: 'bg-black bg-opacity-75'
        }}
        onOverlayClick={e => {
          e.stopPropagation()
          setOpen(false)
        }}
      >
        <div
          className="relative w-full h-full"
          onClick={e => {
            e.stopPropagation()
            setOpen(false)
          }}
        >
          <Image
            alt="Image"
            layout="fill"
            src={post.imageUrls[current]}
            objectFit="contain"
            className="rounded-md"
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
      </Modal>
    </>
  )
}
