import Image from 'next/image'
import React, { useState } from 'react'
import Modal from 'react-responsive-modal'

export default function PostImages({ post, measure }) {
  if (!post.imageUrls || post.imageUrls.length === 0) return null

  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="mt-3 cursor-pointer relative aspect-ratio-16/9 object-contain w-full bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-200"
      >
        <Image
          loading="eager"
          alt="Image"
          layout="fill"
          src={post.imageUrls[0]}
          objectFit="contain"
          className="rounded-md"
        />
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        blockScroll={false}
        closeIcon={<div />}
        classNames={{
          modal:
            'max-w-screen-sm w-full h-screen bg-transparent shadow-none p-0 m-0'
        }}
      >
        <div className="relative w-full h-full" onClick={() => setOpen(false)}>
          <Image
            alt="Image"
            layout="fill"
            src={post.imageUrls[0]}
            objectFit="contain"
            className="rounded-md"
          />
        </div>
      </Modal>
    </>
  )
}
