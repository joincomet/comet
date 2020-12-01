import React, { useEffect, useRef, useState } from 'react'
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiMenu
} from 'react-icons/fi'
import Dropdown from '@/components/Dropdown'

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
  'crafts & DIY',
  'crypto',
  'culture, race & ethnicity',
  'ethics & philosophy',
  'family & relationships',
  'fashion',
  'fitness & nutrition',
  'food & drink',
  'funny/humor',
  'gaming',
  'gender',
  'history',
  'hobbies',
  'home & garden',
  'internet culture & memes',
  'law',
  'learning & education',
  'marketplace & deals',
  'mature themes & adult content',
  'medical & mental health',
  "men's health",
  'meta/cometx',
  'military',
  'movies',
  'music',
  'outdoors & nature',
  'place',
  'podcasts & streamers',
  'politics',
  'programming',
  'reading, writing, & literature',
  'religion & spirituality',
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
      <div className="hidden sm:flex z-10 h-8 flex-row items-center bg-white dark:bg-gray-800 shadow-md select-none">
        <div
          className="inline-block cursor-pointer pl-4 pr-8"
          onClick={() => scroll(true)}
        >
          <FiChevronLeft
            className={`w-5 h-5 transition duration-100  ${
              leftButtonEnabled() ? 'text-tertiary' : 'text-disabled'
            }`}
          />
        </div>
        <div
          ref={sliderRef}
          onScroll={e => setScrollLeft(e.target.scrollLeft)}
          className="h-8 w-full flex flex-row flex-grow flex-nowrap items-center slider overflow-x-scroll overflow-y-hidden text-tertiary font-header space-x-8"
        >
          {galaxies.map(galaxy => (
            <span
              className="inline-flex flex-row items-center h-8 whitespace-nowrap cursor-pointer hover:text-blue-500 transition duration-100 "
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
            className={`w-5 h-5 transition duration-100  ${
              rightButtonEnabled() ? 'text-tertiary' : 'text-disabled'
            }`}
          />
        </div>
        {/*<Dropdown
          button={
            <div className="inline-flex items-center cursor-pointer pr-4 pl-4 h-8">
              <FiMenu
                className={`w-5 h-5 transition duration-100  text-tertiary`}
              />
            </div>
          }
        >
          <div className="w-64 h-16 bg-gray-700" />
          <div />
        </Dropdown>*/}
      </div>
    </>
  )
}
