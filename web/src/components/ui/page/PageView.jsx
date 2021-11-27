export default function PageView({ children, className='' }) {
  return (
    <div className={`${className} max-h-full h-full dark:bg-gray-750 px-6 py-4 scrollbar-custom overflow-y-auto`}>
      {children}
    </div>
  )
}
