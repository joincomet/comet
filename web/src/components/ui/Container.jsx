export default function Container({
  children,
  rightSidebar = false,
  noHeader = false
}) {
  return (
    <div
      className={`pl-78 max-h-full h-full flex flex-col ${
        rightSidebar ? 'pr-60' : ''
      } ${noHeader ? '' : 'pt-12'}`}
    >
      {children}
    </div>
  )
}
