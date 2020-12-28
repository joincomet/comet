import React, { useRef, useState } from 'react'
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

  const [open, setOpen] = useState(false)

  const [scrollLeft, setScrollLeft] = useState(0)
  const sliderRef = useRef()

  const scroll = left => {
    const el = sliderRef.current
    el.scrollTo({
      left: left
        ? el.scrollLeft - 0.75 * el.offsetWidth
        : el.scrollLeft + 0.75 * el.offsetWidth,
      behavior: 'smooth'
    })
  }

  const leftButtonEnabled = () => {
    return scrollLeft > 0
  }

  const rightButtonEnabled = () => {
    if (!sliderRef.current) return true
    return (
      scrollLeft <
      sliderRef.current.scrollWidth - sliderRef.current.offsetWidth - 1
    )
  }

  const arrowbtn =
    'inline-flex items-center absolute top-0 bottom-0 cursor-pointer bg-black bg-opacity-50'

  return (
    <>
      <style jsx>
        {`
          .slider {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE 10+ */
          }
          .slider::-webkit-scrollbar {
            width: 0px;
            background: transparent; /* make scrollbar transparent */
            display: none;
          }
        `}
      </style>

      <div className="relative mt-2 h-32 select-none">
        <div
          className={`${arrowbtn} left-0 ${
            leftButtonEnabled() ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={e => {
            e.stopPropagation()
            scroll(true)
          }}
        >
          <FiChevronLeft className={`w-5 h-5 text-white`} />
        </div>

        <div
          ref={sliderRef}
          onScroll={e => setScrollLeft(e.target.scrollLeft)}
          className="flex space-x-3 slider overflow-x-scroll overflow-y-hidden"
        >
          {post.imageUrls.map((image, index) => (
            <img
              key={index}
              alt="Image"
              src={image}
              className="rounded-lg object-cover h-32 w-32 bg-gray-200 dark:bg-gray-800 cursor-pointer"
              onClick={e => {
                e.stopPropagation()
                setCurrent(index)
                setOpen(true)
              }}
            />
          ))}
        </div>

        <div
          className={`${arrowbtn} right-0 ${
            rightButtonEnabled() ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={e => {
            e.stopPropagation()
            scroll(false)
          }}
        >
          <FiChevronRight className={`w-5 h-5 text-white`} />
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOverlayClick={e => {
          e.stopPropagation()
          setOpen(false)
        }}
        center
        blockScroll={false}
        closeIcon={<div />}
        animationDuration={150}
        classNames={{
          modal: 'modal',
          overlay: 'modal-overlay'
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
