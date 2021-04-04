import { useState, useEffect } from 'react'
import { readURL } from '@/utils/readURL'

export const useDataUrl = file => {
  const [url, setUrl] = useState(null)
  useEffect(() => {
    readURL(file)
      .then(res => setUrl(res))
      .catch(() => setUrl(null))
  }, [file])
  return url
}
