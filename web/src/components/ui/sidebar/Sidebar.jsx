import { CurrentUserInfo } from '@/components/user/CurrentUserInfo'

export default function Sidebar({ children, right = false, show = true }) {
  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } w-60 min-w-[15rem] bg-gray-200 dark:bg-gray-800 ${
        right ? '' : 'pb-12 rounded-tl-lg'
      }`}
    >
      <div className="relative h-full w-full scrollbar-dark">{children}</div>
      {/*{!right && <CurrentUserInfo />}*/}
    </div>
  )
}
