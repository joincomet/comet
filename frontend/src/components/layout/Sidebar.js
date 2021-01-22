import React, { forwardRef } from 'react'
import { CurrentUserInfo } from '@/components/layout/CurrentUserInfo'

export default forwardRef(
  ({ children, right = false, header = false }, ref) => {
    return (
      <div
        ref={ref}
        className={`slideout-menu lg:z-10 ml-16 bottom-0 w-60 bg-gray-200 dark:bg-gray-800 ${
          right ? 'right-0' : 'left-0'
        } ${header ? 'lg:top-12 top-0' : 'top-0'}`}
      >
        {children}
        {!right && <CurrentUserInfo />}
      </div>
    )
  }
)
