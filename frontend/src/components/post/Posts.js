import { usePosts } from '@/lib/queries/usePosts'
import Post from '@/components/post/Post'
import { useCallback, useRef } from 'react'
import { useVirtualWindow } from '@/lib/virtual'
import { useRouter } from 'next/router'

const pageBtn =
  'inline-flex rounded bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 px-3 py-1.5 text-sm font-medium cursor-pointer'

export default function Posts({ variables }) {
  const { query, pathname, push } = useRouter()

  const currentPage = query.page ? parseInt(query.page) : 1

  const { data } = usePosts({ ...variables, page: currentPage - 1 })

  // if (typeof window === 'undefined') return null

  const { posts } = data

  const parentRef = useRef()
  const windowRef = useRef(typeof window === 'undefined' ? null : window)

  const rowVirtualizer = useVirtualWindow({
    size: data.nextPage !== null ? posts.length + 1 : posts.length,
    parentRef,
    estimateSize: useCallback(() => 200, []),
    overscan: 10,
    windowRef
  })

  return (
    <div ref={parentRef}>
      <div
        className="w-full relative"
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
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            {virtualRow.index < posts.length ? (
              <Post post={posts[virtualRow.index]} />
            ) : (
              <div className="flex items-center py-3 px-3 md:px-0">
                {currentPage > 1 && (
                  <div
                    onClick={() => {
                      push({
                        pathname,
                        query: (() => {
                          const q = { ...query, page: currentPage - 1 }
                          if (q.page === 1) delete q.page
                          return q
                        })()
                      }).then(() => window.scrollTo({ top: 0 }))
                    }}
                    className={`${pageBtn}`}
                  >
                    Previous
                  </div>
                )}
                {data.nextPage !== null && (
                  <div
                    onClick={() => {
                      push({
                        pathname,
                        query: { ...query, page: currentPage + 1 }
                      }).then(() => window.scrollTo({ top: 0 }))
                    }}
                    className={`${pageBtn} ml-auto`}
                  >
                    Next
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
