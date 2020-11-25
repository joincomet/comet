import LeftSidebar from './LeftSidebar'
import RightSidebar from '@/components/right-sidebar/RightSidebar'

export default function Layout({ children }) {
  return (
    <div>
      <LeftSidebar />

      <main className="h-full min-h-full page">{children}</main>

      <RightSidebar />
    </div>
  )
}
