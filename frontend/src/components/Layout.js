import LeftNavDrawer from './LeftNavDrawer'

export default function Layout({ children }) {
  return (
    <div>
      <LeftNavDrawer />

      <main>{children}</main>
    </div>
  )
}
