import React, { forwardRef } from 'react'
import { NavLink } from 'react-router-dom'

export default forwardRef(
  (
    { children, large = false, to, onClick, active = false, exact = false },
    ref
  ) => {
    const className = `${
      large ? 'h-11' : 'h-9'
    } group rounded cursor-pointer flex items-center text-base font-medium px-4 w-full dark:hover:bg-gray-775 text-gray-600 dark:text-gray-400`

    const activeClassName =
      'text-gray-800 dark:text-gray-200 dark:bg-gray-750 dark:hover:bg-gray-750'

    if (to)
      return (
        <NavLink
          ref={ref}
          to={to}
          className={`${className} ${active ? activeClassName : ''}`}
          activeClassName={activeClassName}
          exact={exact}
        >
          {children}
        </NavLink>
      )

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`${className} ${active ? activeClassName : ''}`}
      >
        {children}
      </div>
    )
  }
)
