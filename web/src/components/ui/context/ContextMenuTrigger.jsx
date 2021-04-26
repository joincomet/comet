import { useContextMenuTrigger } from '@/providers/ContextMenuProvider'

export default function ContextMenuTrigger({
  data,
  leftClick = false,
  children,
  className
}) {
  const [bindTrigger] = useContextMenuTrigger(data, leftClick)

  return (
    <div className={className} {...bindTrigger}>
      {children}
    </div>
  )
}
