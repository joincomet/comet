import { IconFolder } from '@/components/ui/icons/Icons'
import ShowFoldersButton from '@/components/ui/header/buttons/ShowFoldersButton'
import Header from '@/components/ui/header/Header'
import HeaderTab from '@/components/ui/header/HeaderTab'
import { useStore } from '@/hooks/useStore'

export default function FolderHeader({ folder }) {
  return (
    <Header
      showDivider
      title={folder?.name}
      icon={<IconFolder className="w-5 h-5" />}
    >
      <div className="flex items-center space-x-4">
        <Tab page="Added">Recently Added</Tab>
        <Tab page="Top">Top</Tab>
        <Tab page="New">New</Tab>
      </div>
      <div className="ml-auto">
        <ShowFoldersButton />
      </div>
    </Header>
  )
}

function Tab({ page, children }) {
  const [folderSort, setFolderSort] = useStore(s => [
    s.folderSort,
    s.setFolderSort
  ])
  return (
    <HeaderTab
      page={page}
      currentPage={folderSort}
      setCurrentPage={setFolderSort}
    >
      {children}
    </HeaderTab>
  )
}
