import { FileUpload } from 'graphql-upload'
import { User } from '@/entity'
import { CustomError } from '@/types/CustomError'

export const MAX_FILE_SIZE = 32 * 1024 * 1024 // 32MB limit

export const checkFileSize = async (file: FileUpload, user: User) => {
  const { createReadStream, mimetype, filename } = await file
  const uploadStream = createReadStream()
  let byteLength = 0
  for await (const uploadChunk of uploadStream) {
    byteLength += (uploadChunk as Buffer).byteLength
  }
  if (byteLength >= MAX_FILE_SIZE) {
    throw new CustomError('errors.fileSize', `${MAX_FILE_SIZE / (1024 * 1024)}`)
  }
}
