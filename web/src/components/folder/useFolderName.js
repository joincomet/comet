import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

export const useFolderName = folder => {
  const { t } = useTranslation()
  return useMemo(() => {
    if (folder.name === 'Favorites') return t('folder.favorites')
    else if (folder.name === 'Read Later') return t('folder.readLater')
    else return folder.name
  }, [t, folder.name])
}
