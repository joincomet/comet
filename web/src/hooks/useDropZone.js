import { useCallback, useEffect, useRef, useState } from 'react'

export const useDropZone = () => {
  const [files, setFiles] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragCounter = useRef(0)

  const handleDrag = useCallback(event => {
    event.preventDefault()
    event.stopPropagation()
  }, [])
  const handleDragIn = useCallback(event => {
    event.preventDefault()
    event.stopPropagation()
    dragCounter.current++
    if (
      event.dataTransfer.items &&
      event.dataTransfer.items.length > 0
      // && !event.dataTransfer.items[0].type.startsWith('text')
    ) {
      setIsDragging(true)
    }
  }, [])
  const handleDragOut = useCallback(event => {
    event.preventDefault()
    event.stopPropagation()
    dragCounter.current--
    if (dragCounter.current > 0) return
    setIsDragging(false)
  }, [])
  const handleDrop = useCallback(event => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      dragCounter.current = 0
      setFiles(event.dataTransfer.files)
      event.dataTransfer.clearData()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('dragenter', handleDragIn)
    window.addEventListener('dragleave', handleDragOut)
    window.addEventListener('dragover', handleDrag)
    window.addEventListener('drop', handleDrop)
    return function cleanUp() {
      window.removeEventListener('dragenter', handleDragIn)
      window.removeEventListener('dragleave', handleDragOut)
      window.removeEventListener('dragover', handleDrag)
      window.removeEventListener('drop', handleDrop)
    }
  })

  return [files, isDragging]
}
