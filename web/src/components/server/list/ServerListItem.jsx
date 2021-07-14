import { forwardRef } from 'react'
import Tippy from '@tippyjs/react'
import { NavLink } from 'react-router-dom'
import ctl from '@netlify/classnames-template-literals'

const dotClass = active =>
  ctl(`
  w-12
  h-12
  object-cover
  inline-flex
  items-center
  justify-center
  hover:rounded-2xl
  ${active ? 'rounded-2xl' : 'rounded-3xl'}
  transform
  transition-all
  relative
  group
  cursor-pointer
`)

const highlightClass = (active, unread) =>
  ctl(`
  absolute
  left-0
  w-1
  dark:bg-white
  bg-gray-900
  rounded-r-2xl
  top-1/2
  -translate-y-1/2
  transform
  transition
  duration-250
  group-hover:-translate-x-3
  ${
    active
      ? '-translate-x-3 h-10'
      : unread
      ? '-translate-x-3 h-2.5 group-hover:h-5'
      : '-translate-x-4 h-5'
  }
`)

export default forwardRef(
  (
    {
      name,
      children,
      to,
      onClick,
      className = 'dark:bg-gray-800 bg-gray-200',
      active = false,
      unread = false
    },
    ref
  ) => {
    return (
      <Tippy content={name} placement="right" ref={ref} offset={[0, 22]}>
        {to ? (
          <NavLink to={to} className={`${dotClass(active)} ${className}`}>
            <div className={highlightClass(active, unread)} />
            {children}
          </NavLink>
        ) : (
          <div onClick={onClick} className={`${dotClass(active)} ${className}`}>
            <div className={highlightClass(active, unread)} />
            {children}
          </div>
        )}
      </Tippy>
    )
  }
)
