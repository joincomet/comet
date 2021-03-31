import { FileUpload } from 'graphql-upload'
import { User } from '@/entity'
import { CustomError } from '@/types/CustomError'

export const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8MB limit
export const MAX_FILE_SIZE_PREMIUM = 100 * 1024 * 1024 // 100MB limit for Infinity

export const checkFileSize = async (file: FileUpload, user: User) => {
  const { createReadStream, mimetype, filename } = await file
  const uploadStream = createReadStream()
  let byteLength = 0
  for await (const uploadChunk of uploadStream) {
    byteLength += (uploadChunk as Buffer).byteLength
  }
  const maxSize = user.isPremium ? MAX_FILE_SIZE_PREMIUM : MAX_FILE_SIZE
  if (byteLength >= maxSize) {
    throw new CustomError('errors.fileSize', `${maxSize / (1024 * 1024)}`)
  }
}
