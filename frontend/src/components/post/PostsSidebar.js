import { RiFireFill } from 'react-icons/ri'
import { HiSortAscending, HiClock, HiFolder } from 'react-icons/hi'
import React, { forwardRef } from 'react'
import { useRouter } from 'next/router'
import { useFolders } from '@/lib/queries/useFolders'

export default forwardRef((props, ref) => {
  const folders = useFolders().data || []
  const { query, pathname } = useRouter()
  return (
    <div
      ref={ref}
      className="bg-gray-200 dark:bg-gray-800 h-full slideout-menu right-0 top-0 w-60"
    >
      <div className="px-1">
        <div className="sidebar-label">FOLDERS</div>

        {folders.map(folder => (
          <div
            key={folder.id}
            className={`sidebar-item ${
              pathname === '/folder/[folderid]' && query.folderid === folder.id
                ? 'dark:bg-gray-800 text-secondary'
                : 'text-tertiary'
            }`}
          >
            <HiFolder className="w-5 h-5 mr-3" />
            {folder.name}
          </div>
        ))}
      </div>
    </div>
  )
})
