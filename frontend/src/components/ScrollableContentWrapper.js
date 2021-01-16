import React, { useMemo, memo, forwardRef } from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/src/simplebar.css'

const styleDefault = {
  height: '100%',
  flexGrow: 1,
  overflowY: 'auto',
  willChange: 'transform',
  width: '100%'
}

const ScrollableContentWrapper = forwardRef(
  ({ onScroll, children, style }, ref) => {
    const simpleBarStyle = useMemo(() => ({ ...style, ...styleDefault }), [
      style
    ])
    return (
      <SimpleBar style={simpleBarStyle} scrollableNodeProps={{ ref, onScroll }}>
        {children}
      </SimpleBar>
    )
  }
)

export default memo(ScrollableContentWrapper)
