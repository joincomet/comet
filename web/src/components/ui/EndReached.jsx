import { memo } from 'react'

export default memo(function EndReached({
  children = 'You have reached the end!'
}) {
  return (
    <div className="flex flex-col items-center justify-center text-primary">
      <img
        alt="astronaut"
        src="/astronaut.png"
        className="object-contain opacity-50 h-48 animate-float"
      />
      <div className="text-tertiary pt-1 text-lg font-semibold">{children}</div>
    </div>
  )
})
