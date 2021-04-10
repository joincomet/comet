import { forwardRef } from 'react'
import { NavLink } from 'react-router-dom'
import ctl from '@netlify/classnames-template-literals'

const className = large =>
  ctl(`
  ${large ? 'h-11' : 'h-9'}
  group
  rounded
  cursor-pointer
  flex
  items-center
  text-base
  font-medium
  px-4
  w-full
  dark:hover:bg-gray-775
  text-gray-600
  dark:text-gray-400
  dark:active:bg-gray-775
  select-none
  focus:outline-none
  relative
`)

const activeClassName = ctl(`
  text-gray-800
  dark:text-gray-200
  dark:bg-gray-750
  dark:hover:bg-gray-750
`)

export default forwardRef(
  (
    { children, large = false, to, onClick, active = false, exact = false },
    ref
  ) => {
    if (to)
      return (
        <NavLink
          ref={ref}
          to={to}
          className={`${className(large)} ${active ? activeClassName : ''}`}
          activeClassName={activeClassName}
          exact={exact}
        >
          {children}
        </NavLink>
      )

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`${className(large)} ${active ? activeClassName : ''}`}
      >
        {children}
      </button>
    )
  }
)
