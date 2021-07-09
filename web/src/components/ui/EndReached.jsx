import { memo } from 'react'
import astronaut from './astronaut.png'

export default memo(function EndReached({
  children = 'No more posts loaded!',
  className = 'h-48'
}) {
  return (
    <div className="flex flex-col items-center justify-center text-primary py-6">
      <img
        alt="astronaut"
        src={astronaut}
        className={`object-contain opacity-50 animate-float select-none pointer-events-none ${className}`}
      />
      <div className="text-tertiary pt-3 text-lg font-semibold">{children}</div>
    </div>
  )
})
