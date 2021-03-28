import { forwardRef } from 'react'
import { SidebarUserInfo } from '@/components/sidebars/base/SidebarUserInfo'

export default forwardRef(({ children, right = false, show = true }, ref) => {
  return (
    <div
      ref={ref}
      className={`${
        show ? 'flex' : 'hidden'
      } fixed bottom-0 w-60 bg-gray-200 dark:bg-gray-800 ${
        right
          ? 'right-0 top-12 electron:top-17.5'
          : 'electron:top-5.5 top-0 left-18 pb-12 rounded-tl-lg'
      }`}
    >
      <div className="relative h-full w-full">{children}</div>
      {!right && <SidebarUserInfo />}
    </div>
  )
})
