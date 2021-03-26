import React, { forwardRef } from 'react'
import Tippy from '@tippyjs/react'
import { NavLink } from 'react-router-dom'
import ctl from '@netlify/classnames-template-literals'

const itemClass = ctl(`
  flex-shrink-0
  inline-flex
  items-end
  justify-center
  w-full
  h-14
  rounded-full
  cursor-pointer
  group
`)

const dotClass = ctl(`
  w-12
  h-12
  object-cover
  inline-flex
  items-center
  justify-center
  rounded-full
  transform
  transition
  relative
`)

const highlightClass = active =>
  ctl(`
  absolute
  left-0
  w-1
  dark:bg-white
  rounded-r-2xl
  top-1/2
  -translate-y-1/2
  transform
  transition
  duration-250
  group-hover:-translate-x-3
  ${active ? '-translate-x-3 h-10' : '-translate-x-4 h-5'}
`)

export default forwardRef(
  (
    {
      name,
      children,
      to,
      onClick,
      className = 'dark:bg-gray-800 bg-gray-200',
      active = false
    },
    ref
  ) => {
    return (
      <Tippy content={name} placement="right" ref={ref}>
        <div className={itemClass}>
          {to ? (
            <NavLink to={to} className={`${dotClass} ${className}`}>
              <div className={highlightClass(active)} />
              {children}
            </NavLink>
          ) : (
            <div onClick={onClick} className={`${dotClass} ${className}`}>
              <div className={highlightClass(active)} />
              {children}
            </div>
          )}
        </div>
      </Tippy>
    )
  }
)
