import React, { forwardRef } from 'react'
import 'content-visibility'

/*export default function Scroller({ children }) {
  return <content-visibility>{children}</content-visibility>
}*/

export default forwardRef(({ children }, ref) => {
  return <content-visibility ref={ref}>{children}</content-visibility>
})
