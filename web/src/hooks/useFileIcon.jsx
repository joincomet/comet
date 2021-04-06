import { useMemo } from 'react'
import {
  IconFileArchive,
  IconFileAudio,
  IconFileCode,
  IconFileCsv,
  IconFileExcel,
  IconFileImage,
  IconFilePdf,
  IconFilePowerpoint,
  IconFileText,
  IconFileVideo,
  IconFileWord
} from '@/components/ui/icons/Icons'

const archives = [
  'application/vnd.rar',
  'application/x-tar',
  'application/zip',
  'application/x-7z-compressed',
  'application/java-archive',
  'application/x-bzip',
  'application/x-bzip2',
  'application/gzip',
  'application/x-freearc'
]
const word = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/x-abiword',
  'application/rtf',
  'application/vnd.oasis.opendocument.text'
]
const code = [
  'application/xhtml+xml',
  'application/xml',
  'text/xml',
  'application/json',
  'application/ld+json',
  'text/css',
  'application/x-csh',
  'text/html',
  'text/javascript',
  'application/x-httpd-php',
  'application/x-sh',
  'application/vnd.mozilla.xul+xml'
]
const excel = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.oasis.opendocument.spreadsheet'
]
const powerpoint = [
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.oasis.opendocument.presentation'
]

export const useFileIcon = mime => {
  return useMemo(() => {
    if (!mime) return null
    if (mime.startsWith('audio')) return IconFileAudio
    if (mime.startsWith('image')) return IconFileImage
    if (mime.startsWith('video')) return IconFileVideo
    if (mime === 'text/csv') return IconFileCsv
    if (mime === 'application/pdf') return IconFilePdf
    if (word.includes(mime)) return IconFileWord
    if (excel.includes(mime)) return IconFileExcel
    if (powerpoint.includes(mime)) return IconFilePowerpoint
    if (archives.includes(mime)) return IconFileArchive
    if (code.includes(mime)) return IconFileCode
    return IconFileText
  }, [mime])
}
