import { useEffect } from 'react'
import ExploreSidebar from '@/pages/explore/ExploreSidebar'
import {
  IconSearch,
  IconFeatured,
  IconTop,
  IconNew,
  IconAll
} from '@/components/ui/icons/Icons'
import Header from '@/components/ui/header/Header'
import ServerInfoCard from '@/components/server/ServerInfoCard'
import { useCategoryIcon } from '@/hooks/useCategoryIcon'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { GET_PUBLIC_SERVERS } from '@/graphql/queries'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks/useStore'
import Container from '@/components/ui/Container'
import View from '@/components/ui/View'

export default function ExplorePage() {
  const { explorePage, setExplorePage } = useStore()

  const { t } = useTranslation()

  const servers = [] // TODO

  return (
    <>
      <ExploreSidebar />

      <Container noHeader>
        <View>
          <div className="px-8 py-8">
            <div className="flex pb-8 items-center justify-center">
              <div className="shadow-md max-w-screen-sm w-full flex h-10 relative bg-white dark:bg-gray-600 rounded-md dark:text-gray-400 transition dark:focus-within:text-white">
                <input className="h-full dark:bg-gray-600 rounded-l-md text-sm px-4 flex-grow focus:outline-none dark:text-white dark:placeholder-gray-400 font-medium" />
                <button
                  type="button"
                  className="rounded-r-md inline-flex justify-center items-center h-10 w-10 cursor-pointer"
                >
                  <IconSearch className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5">
              {servers.map(server => (
                <ServerInfoCard planet={server} key={server.id} />
              ))}
            </div>
          </div>
        </View>
      </Container>
    </>
  )
}
