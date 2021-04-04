import {
  IconAll,
  IconFeatured,
  IconNew,
  IconTop
} from '@/components/ui/icons/Icons'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import { useStore } from '@/hooks/useStore'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import { ServerCategory } from '@/types/ServerCategory'
import { useCategoryIcon } from '@/hooks/useCategoryIcon'
import { useTranslation } from 'react-i18next'

function CategoryItem({ category }) {
  const [explorePage, setExplorePage] = useStore(s => [
    s.explorePage,
    s.setExplorePage
  ])

  const Icon = useCategoryIcon(category)
  return (
    <SidebarItem
      onClick={() => setExplorePage(category)}
      active={explorePage === category}
    >
      <Icon className="w-5 h-5 mr-3" />
      {category}
    </SidebarItem>
  )
}

function CategorySort({ sort, icon }) {
  const [explorePage, setExplorePage] = useStore(s => [
    s.explorePage,
    s.setExplorePage
  ])

  const Icon = icon
  return (
    <SidebarItem
      onClick={() => setExplorePage(sort)}
      active={explorePage === sort}
    >
      <Icon className="w-5 h-5 mr-3" />
      {sort}
    </SidebarItem>
  )
}

export default function ExploreSidebar() {
  const { t } = useTranslation()
  const categories = Object.keys(ServerCategory)

  return (
    <Sidebar>
      <div className="text-xl font-semibold px-4 h-12 flex items-center text-secondary">
        {t('explore.title')}
      </div>
      <div className="px-1.5 pb-6">
        <div className="space-y-0.5">
          <CategorySort sort="Featured" icon={IconFeatured} />
          <CategorySort sort="Most Popular" icon={IconTop} />
          <CategorySort sort="Recently Created" icon={IconNew} />
          <CategorySort sort="All" icon={IconAll} />
        </div>

        <SidebarLabel>{t('explore.categories')}</SidebarLabel>

        <div className="space-y-0.5">
          {categories.map(category => (
            <CategoryItem key={category} category={category} />
          ))}
        </div>
      </div>
    </Sidebar>
  )
}
