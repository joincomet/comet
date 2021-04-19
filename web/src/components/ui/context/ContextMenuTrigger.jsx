import { useContextMenuTrigger } from '@/providers/ContextMenuProvider'

export default function ContextMenuTrigger({
  data,
  leftClick = false,
  children
}) {
  const [bindTrigger] = useContextMenuTrigger(data, leftClick)

  return <div {...bindTrigger}>{children}</div>
}
