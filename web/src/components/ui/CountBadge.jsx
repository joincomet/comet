export default function CountBadge({ count }) {
  return (
    <div className="rounded-full bg-red-500 w-4 h-4 flex items-center justify-center">
      <div
        className="leading-none text-11 font-medium text-primary"
        style={{ marginLeft: '-1px' }}
      >
        {count}
      </div>
    </div>
  )
}
