import { useState, useEffect } from 'react'
import { readURL } from '@/utils/readURL'

export const useDataUrls = (files) => {
  const [urls, setUrls] = useState([])
  useEffect(() => {
    if (!files || !files.length) return
    const tempUrls = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.startsWith('image')) {
        setUrls([])
        return
      }
      readURL(file)
        .then(res => tempUrls.push(res))
        .catch(() => tempUrls.push(null))
    }
    setUrls(tempUrls)
  }, [files])
  return urls
}
