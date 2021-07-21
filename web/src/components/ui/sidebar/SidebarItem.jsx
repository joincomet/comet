import { forwardRef } from 'react'
import { NavLink } from 'react-router-dom'
import ctl from '@netlify/classnames-template-literals'

const className = (large, small, light) =>
  ctl(`
  ${large && 'h-11'}
  ${small && 'h-9'}
  ${!large && !small && 'h-9'}
  group
  rounded
  cursor-pointer
  flex
  items-center
  text-base
  font-medium
  px-4
  w-full
  ${
    light
      ? 'dark:hover:bg-gray-725 dark:active:bg-gray-725 hover:bg-gray-300 active:bg-gray-300'
      : 'dark:hover:bg-gray-775 dark:active:bg-gray-775 hover:bg-gray-300 active:bg-gray-300'
  }
  text-gray-600
  dark:text-gray-400
  select-none
  focus:outline-none
  relative
  hover:text-gray-700
  dark:hover:text-gray-300
`)

const activeClassName = light =>
  ctl(`
  text-gray-800
  hover:text-gray-800
  dark:text-gray-200
  dark:hover:text-gray-200
  ${
    light
      ? `dark:bg-gray-700 dark:hover:bg-gray-700 bg-gray-300`
      : `dark:bg-gray-750 dark:hover:bg-gray-750 bg-gray-300`
  }
`)

export default forwardRef(
  (
    {
      children,
      large = false,
      small = false,
      to,
      onClick,
      active,
      exact = false,
      light = false
    },
    ref
  ) => {
    if (to)
      return (
        <NavLink
          ref={ref}
          to={to}
          className={`${className(large, small, light)} ${
            active ? activeClassName(light) : ''
          }`}
          activeClassName={active != null ? '' : activeClassName(light)}
          exact={exact}
        >
          {children}
        </NavLink>
      )

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`${className(large, small, light)} ${
          active ? activeClassName(light) : ''
        }`}
        type="button"
      >
        {children}
      </button>
    )
  }
)
