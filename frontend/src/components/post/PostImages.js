import Image from 'next/image'
import React, { useState } from 'react'
import Modal from 'react-responsive-modal'

export default function PostImages({ post }) {
  if (!post.imageUrls || post.imageUrls.length === 0) return null

  const [open, setOpen] = useState(false)

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
          src={post.imageUrls[0]}
          objectFit="cover"
          className="rounded"
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
            src={post.imageUrls[0]}
            objectFit="contain"
            className="rounded-md"
          />
        </div>
      </Modal>
    </>
  )
}
