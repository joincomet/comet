import RSC from 'react-scrollbars-custom'
import React from 'react'

function CustomScrollbars({
  children,
  forwardedRef,
  onScroll,
  style,
  className
}) {
  return (
    <RSC
      className={className}
      style={style}
      scrollerProps={{
        renderer: props => {
          const { elementRef, onScroll: rscOnScroll, ...restProps } = props

          return (
            <span
              {...restProps}
              onScroll={e => {
                onScroll(e)
                rscOnScroll(e)
              }}
              ref={ref => {
                forwardedRef(ref)
                elementRef(ref)
              }}
            />
          )
        }
      }}
    >
      {children}
    </RSC>
  )
}

export const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
))
