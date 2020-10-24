import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const galaxies = [
  'activism',
  'addiction support',
  'animals & pets',
  'anime',
  'art',
  'beauty & makeup',
  'business, economics & finance',
  'careers',
  'cars & motor vehicles',
  'celebrity',
  'crafts and DIY',
  'crypto',
  'culture, race, and ethnicity',
  'ethics and philosophy',
  'family and relationships',
  'fashion',
  'fitness and nutrition',
  'food and drink',
  'funny/humor',
  'gaming',
  'gender',
  'history',
  'hobbies',
  'home and garden',
  'internet culture and memes',
  'law',
  'learning and education',
  'marketplace and deals',
  'mature themes and adult content',
  'medical and mental health',
  "men's health",
  'meta/cometx',
  'military',
  'movies',
  'music',
  'outdoors and nature',
  'place',
  'podcasts and streamers',
  'politics',
  'programming',
  'reading, writing, and literature',
  'religion and spirituality',
  'science',
  'sexual orientation',
  'sports',
  'tabletop games',
  'technology',
  'television',
  'trauma support',
  'travel',
  "women's health",
  'world news'
]

export default function GalaxiesSlider() {
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
      <div className="z-10 h-8 flex flex-row items-center bg-gray-800 shadow-md select-none">
        <div
          className="inline-block cursor-pointer pl-4 pr-8"
          onClick={() => scroll(true)}
        >
          <FiChevronLeft
            className={`w-5 h-5 transition duration-100 ease-in-out ${
              leftButtonEnabled() ? 'text-tertiary' : 'text-disabled'
            }`}
          />
        </div>
        <div
          ref={sliderRef}
          onScroll={e => setScrollLeft(e.target.scrollLeft)}
          className="h-8 w-full flex flex-row flex-grow flex-no-wrap items-center slider overflow-x-scroll overflow-y-hidden text-tertiary text-xs font-mono space-x-8 uppercase"
        >
          {galaxies.map(galaxy => (
            <span
              className="inline-flex flex-row items-center h-8 whitespace-no-wrap cursor-pointer hover:text-blue-500 transition duration-100 ease-in-out"
              key={galaxy}
            >
              {galaxy}
            </span>
          ))}
        </div>
        <div
          className="inline-block cursor-pointer pr-4 pl-8"
          onClick={() => scroll(false)}
        >
          <FiChevronRight
            className={`w-5 h-5 transition duration-100 ease-in-out ${
              rightButtonEnabled() ? 'text-tertiary' : 'text-disabled'
            }`}
          />
        </div>
      </div>
    </>
  )
}
