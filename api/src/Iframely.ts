import axios from 'axios'

export const getThumbnailUrl = async (url: string): Promise<string | null> => {
  const { data } = await axios.get(`http://iframely/iframely?url=${url}`)
  if (data.error) return null
  const { thumbnail } = data.links
  if (thumbnail && thumbnail.length > 0) {
    const url = thumbnail[0].href
  }
  return null
}

export const getTitleAtUrl = async (url: string): Promise<string | null> => {
  const { data } = await axios.get(`http://iframely/iframely?url=${url}`)
  if (data.error) return null
  return data.meta.title
}
