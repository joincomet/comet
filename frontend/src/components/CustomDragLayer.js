import React, { useEffect, useState } from 'react'
import { useDragLayer } from 'react-dnd'
import PostDragPreview from '@/components/post/PostDragPreview'
const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0
}

function getItemStyles(
  initialOffset,
  currentOffset,
  mouseDownPosition,
  mouseUpPosition
) {
  if (!initialOffset) initialOffset = { x: 0, y: 0 }
  let mouseOffset = {
    x: mouseDownPosition.x - initialOffset.x,
    y: mouseDownPosition.y - initialOffset.y
  }
  let { x, y } = currentOffset || {
    x: mouseUpPosition.x - initialOffset.x,
    y: mouseUpPosition.y - initialOffset.y
  }
  const transform = `translate(${x + mouseOffset.x}px, ${y + mouseOffset.y}px)`
  return {
    transform,
    WebkitTransform: transform
  }
}

function CustomDragLayer() {
  const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 })
  const [mouseUpPosition, setMouseUpPosition] = useState({ x: 0, y: 0 })

  const handleMouseDown = e =>
    setMouseDownPosition({ x: e.clientX, y: e.clientY })
  const handleMouseUp = e =>
    setMouseDownPosition({ x: e.clientX, y: e.clientY })

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  })

  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }))

  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(
          initialOffset,
          currentOffset,
          mouseDownPosition,
          mouseUpPosition
        )}
      >
        <PostDragPreview post={item ? item.post : null} show={isDragging} />
      </div>
    </div>
  )
}

export default React.memo(CustomDragLayer)
