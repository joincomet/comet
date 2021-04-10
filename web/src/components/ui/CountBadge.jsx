export default function CountBadge({ count }) {
  return (
    <div className="rounded-full bg-red-400 w-4 h-4 inline-flex items-center justify-center text-xs font-medium text-center text-primary">
      {count}
    </div>
  )
}
