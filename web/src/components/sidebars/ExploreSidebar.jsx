import { IconNew, IconTop, IconAll, IconFeatured } from '@/lib/Icons'
import { forwardRef } from 'react'
import Sidebar from '@/components/sidebars/base/Sidebar'
import { categoryIcon } from '@/lib/categoryIcon'
import { Link, useHistory, useParams } from 'react-router-dom'
import { categories } from '@/lib/categories'
import SidebarLabel from '@/components/sidebars/base/SidebarLabel'
import { useStore } from '@/lib/stores/useStore'
import SidebarItem from '@/components/sidebars/base/SidebarItem'

function CategoryItem({ name, icon }) {
  const { explorePage, setExplorePage } = useStore()

  return (
    <SidebarItem
      onClick={() => setExplorePage(name)}
      active={explorePage === name}
    >
      <IconFeatured className="w-5 h-5 mr-3" />
      {icon}
      {name}
    </SidebarItem>
  )
}

export default forwardRef((props, ref) => {
  return (
    <Sidebar ref={ref}>
      <div className="text-xl font-semibold px-4 h-12 flex items-center text-secondary">
        Explore
      </div>
      <div className="px-1.5 pb-6">
        <div className="space-y-0.5">
          <CategoryItem
            name="Featured"
            icon={<IconFeatured className="w-5 h-5 mr-3" />}
          />
          <CategoryItem
            name="Most Popular"
            icon={<IconTop className="w-5 h-5 mr-3" />}
          />
          <CategoryItem
            name="Recently Created"
            icon={<IconNew className="w-5 h-5 mr-3" />}
          />
          <CategoryItem
            name="All"
            icon={<IconAll className="w-5 h-5 mr-3" />}
          />
        </div>

        <SidebarLabel>CATEGORIES</SidebarLabel>

        {categories.map(name => (
          <CategoryItem
            key={name}
            name={name}
            icon={categoryIcon(name, 'h-5 w-5 mr-3')}
          />
        ))}
      </div>
    </Sidebar>
  )
})
