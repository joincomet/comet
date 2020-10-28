import LeftSidebar from './LeftSidebar'

export default function Layout({ children }) {
  return (
    <div>
      <LeftSidebar />

      <main>{children}</main>
    </div>
  )
}
