import Layout from '../components/Layout'
import { gql } from '@apollo/client'
import { initializeApollo } from '@/lib/apolloClient'
import RightSidebar from '@/components/right-sidebar/RightSidebar'
import GalaxiesSlider from '@/components/GalaxiesSlider'
import { RiFireLine } from 'react-icons/ri'
import SearchBar from '@/components/SearchBar'
import CreatePostCard from '@/components/CreatePostCard'
import Posts from '@/components/post/Posts'

const POSTS = gql`
  query Posts {
    posts(sort: HOT) {
      id
      id36
      title
      textContent
      linkURL
      imageURLs
      relativeURL
      commentCount
      rocketCount
      embed {
        links {
          icon {
            href
          }
          thumbnail {
            href
          }
        }
        meta {
          title
          description
        }
      }
      domain
      planet {
        name
      }
      author {
        username
        profile {
          avatarURL
        }
      }
      timeSince
      timeSinceEdited
    }
  }
`

export default function Home({ posts }) {
  return (
    <>
      <style jsx>{`
        .virtual-list {
          flex-basis: auto !important;
        }
      `}</style>

      <Layout>
        <div className="page">
          <GalaxiesSlider />
          <div className="container pt-5 mx-auto sm:px-5 2xl:px-80">
            <CreatePostCard />

            <div>
              <div className="flex items-center mb-5 px-3 sm:px-0">
                <SearchBar
                  slashFocus={true}
                  className="shadow-md w-full h-10 text-sm px-16 rounded-full dark:bg-gray-800 outline-none transition duration-200 ease-in-out border border-gray-800 focus:border-blue-500"
                />
                <div className="h-10 px-8 inline-flex items-center cursor-pointer text-sm hover:text-blue-500 transition duration-150 ease-in-out text-tertiary">
                  <RiFireLine className="w-4 h-4 mr-4" />
                  Hot
                </div>
                {/*<SortDropdown />*/}
              </div>

              <div className="flex items-center text-xs text-tertiary font-mono space-x-5 mb-3 px-6">
                <span className="font-bold cursor-pointer hover:underline">
                  Cards
                </span>
                <span className="cursor-pointer hover:underline">
                  Condensed
                </span>
              </div>

              <Posts initial={posts} />
            </div>
          </div>
        </div>
        <RightSidebar />
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const client = initializeApollo()

  const { data } = await client.query({
    query: POSTS
  })

  return {
    props: {
      posts: data.posts
    }
  }
}
