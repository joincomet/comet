import { IconSpinner } from '@/components/ui/icons/Icons'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function ServerLoadingScreen() {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, delay: 0.3 }}
      style={{ zIndex: 9999 }}
      className="h-full fixed bottom-0 right-0 left-78 top-0 electron:top-5.5 flex items-center justify-center dark:bg-gray-800"
    >
      <div className="space-y-8">
        <div>{t('server.loading')}</div>
        <div className="flex items-center justify-center">
          <IconSpinner />
        </div>
      </div>
    </motion.div>
  )
}
