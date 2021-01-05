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
    if (!sliderRef.current) return false
    return (
      sliderRef.current.scrollWidth > sliderRef.current.offsetWidth &&
      scrollLeft <
        sliderRef.current.scrollWidth - sliderRef.current.offsetWidth - 1
    )
  }

  const arrowbtn =
    'z-10 inline-flex items-center absolute top-0 bottom-0 cursor-pointer bg-black bg-opacity-50'

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

      {post.imageUrls.length === 1 ? (
        <div className="mt-2 relative md:mx-24">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-black rounded-lg">
            <img
              src={post.imageUrls[0]}
              className="object-contain"
              alt="Image"
              onClick={e => {
                e.stopPropagation()
                setCurrent(0)
                setOpen(true)
              }}
            />
          </div>
        </div>
      ) : (
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
            className="flex space-x-3 overflow-x-scroll overflow-y-hidden slider h-32"
          >
            {post.imageUrls.map((image, index) => (
              <img
                src={image}
                alt={index}
                key={index}
                onClick={e => {
                  e.stopPropagation()
                  setCurrent(index)
                  setOpen(true)
                }}
                className="w-32 h-32 rounded-lg bg-gray-200 dark:bg-gray-800 cursor-pointer object-cover"
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
      )}

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
      >
        <div
          onClick={e => {
            e.stopPropagation()
            setOpen(false)
          }}
          className="h-full w-full flex items-center justify-center select-none"
        >
          <div className="relative">
            <img
              alt="Image"
              src={post.imageUrls[current]}
              className="md:rounded-md select-none"
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
