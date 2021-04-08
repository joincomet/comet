import { useContextTrigger } from '@/providers/ContextMenuProvider'

export default function ContextMenuTrigger({
  data,
  leftClick = false,
  children
}) {
  const [bindTrigger] = useContextTrigger(data, leftClick)

  return (
    <span className="leading-none" {...bindTrigger}>
      {children}
    </span>
  )
}
