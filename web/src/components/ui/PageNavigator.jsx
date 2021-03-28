import { IconChevrownLeft, IconChevrownRight } from '@/lib/Icons'

import { useParams, useLocation, Link } from 'react-router-dom'

export default function PageNavigator({ nextEnabled = true }) {
  const params = useParams()
  const { pathname } = useLocation()

  const backEnabled = params.page && params.page > 1

  const className =
    'flex items-center justify-center flex-grow transition dark:hover:bg-gray-800 h-full cursor-pointer'

  return (
    <>
      {(nextEnabled || backEnabled) && (
        <div className="h-16 flex items-center justify-center text-secondary border-t border-gray-200 dark:border-gray-700 dark:bg-gray-775">
          {backEnabled ? (
            <Link
              to={{
                pathname,
                query: (() => {
                  const q = { ...params, page: parseInt(params.page) - 1 }
                  if (q.page === 1) delete q.page
                  return q
                })()
              }}
              className={className}
            >
              <IconChevrownLeft className="h-5 w-5" />
            </Link>
          ) : (
            <div className={`flex-grow`} />
          )}

          <div className="flex h-full items-center justify-center flex-grow-0 w-32 text-base text-secondary">
            Page {params.page || 1}
          </div>

          {nextEnabled ? (
            <Link
              to={{
                pathname,
                query: {
                  ...params,
                  page: params.page ? parseInt(params.page) + 1 : 2
                }
              }}
              className={className}
            >
              <IconChevrownRight className="h-5 w-5" />
            </Link>
          ) : (
            <div className={`flex-grow`}></div>
          )}
        </div>
      )}
    </>
  )
}
