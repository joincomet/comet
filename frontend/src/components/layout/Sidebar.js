import { forwardRef } from 'react'

export default forwardRef(({ children, left = true, right = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`slideout-menu md:z-10 ml-16 top-0 bottom-0 w-60 bg-gray-200 dark:bg-gray-800 ${
        right ? 'right-0' : 'left-0'
      }`}
    >
      {children}
    </div>
  )
})
