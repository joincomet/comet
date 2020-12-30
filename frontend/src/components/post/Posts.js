import { usePosts } from '@/lib/queries/usePosts'
import Post from '@/components/post/Post'
import { useCallback, useEffect, useRef } from 'react'
import { useVirtualWindow } from '@/lib/virtual'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner'
import NavLink from '@/components/NavLink'

const pageBtn =
  'inline-flex rounded bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 px-3 py-1.5 text-sm font-medium cursor-pointer'

export default function Posts({ variables }) {
  const { query, pathname } = useRouter()

  const currentPage = variables.page + 1

  const { data, isLoading } = usePosts(variables)

  const parentRef = useRef()
  const windowRef = useRef(typeof window === 'undefined' ? null : window)

  const posts = data ? data.posts : []

  const rowVirtualizer = useVirtualWindow({
    size: data ? (data.nextPage !== null ? posts.length + 1 : posts.length) : 0,
    parentRef,
    estimateSize: useCallback(() => 200, []),
    overscan: 10,
    windowRef
  })

  useEffect(() => {
    rowVirtualizer.setMeasuredCache({})
    window.scrollTo({ top: 5 })
    window.scrollTo({ top: 0 })
  }, [currentPage, posts])

  return (
    <div ref={parentRef}>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div
          className="w-full relative z-0"
          style={{
            height: `${rowVirtualizer.totalSize}px`
          }}
        >
          {rowVirtualizer.virtualItems.map(virtualRow => (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureRef}
              className="absolute top-0 left-0 w-full h-auto"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
                zIndex: posts.length - virtualRow.index
              }}
            >
              {virtualRow.index < posts.length ? (
                <Post post={posts[virtualRow.index]} />
              ) : (
                <div className="flex items-center py-3 px-3 md:px-0">
                  {currentPage > 1 && (
                    <NavLink
                      href={{
                        pathname,
                        query: (() => {
                          const q = { ...query, page: currentPage - 1 }
                          if (q.page === 1) delete q.page
                          return q
                        })()
                      }}
                      shallow
                      className={`${pageBtn}`}
                    >
                      Previous
                    </NavLink>
                  )}
                  {data.nextPage !== null && (
                    <NavLink
                      href={{
                        pathname,
                        query: { ...query, page: currentPage + 1 }
                      }}
                      shallow
                      className={`${pageBtn} ml-auto`}
                    >
                      Next
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
