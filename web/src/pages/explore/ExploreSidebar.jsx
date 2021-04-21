import { IconFeatured, IconNew, IconTop } from '@/components/ui/icons/Icons'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import { useStore } from '@/hooks/useStore'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import { ServerCategory } from '@/graphql/hooks'
import { useCategoryIcon } from '@/hooks/useCategoryIcon'
import { useTranslation } from 'react-i18next'
import { VectorLogoIcon } from '@/components/ui/vectors/VectorLogoIcon'

function Category({ category }) {
  const { t } = useTranslation()
  const [exploreCategory, setExploreCategory] = useStore(s => [
    s.exploreCategory,
    s.setExploreCategory
  ])

  const Icon = useCategoryIcon(category)
  return (
    <SidebarItem
      onClick={() => setExploreCategory(category)}
      active={exploreCategory === category}
    >
      <Icon className="w-5 h-5 mr-3" />
      {category ? t(`category.${category}`) : t('explore.all')}
    </SidebarItem>
  )
}

function Sort({ sort, label, icon }) {
  const [exploreSort, setExploreSort] = useStore(s => [
    s.exploreSort,
    s.setExploreSort
  ])

  const Icon = icon
  return (
    <SidebarItem
      onClick={() => setExploreSort(sort)}
      active={exploreSort === sort}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </SidebarItem>
  )
}

export default function ExploreSidebar() {
  const { t } = useTranslation()
  const categories = Object.keys(ServerCategory)

  return (
    <Sidebar>
      <div className="text-xl font-semibold px-4 h-12 flex items-center text-secondary">
        <VectorLogoIcon className="w-5 h-5 mr-3" />
        {t('explore.title')}
      </div>
      <div className="px-1.5 pb-6">
        <div className="space-y-0.5">
          <Sort label="Featured" sort="Featured" icon={IconFeatured} />
          <Sort label="Most Popular" sort="Top" icon={IconTop} />
          <Sort label="Recently Created" sort="New" icon={IconNew} />
        </div>

        <SidebarLabel>{t('explore.categories')}</SidebarLabel>

        <div className="space-y-0.5">
          <Category category={null} />
          {categories.map(category => (
            <Category key={category} category={category} />
          ))}
        </div>
      </div>
    </Sidebar>
  )
}
