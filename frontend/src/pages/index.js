import { usePlanets } from '@/lib/queries/usePlanets'
import { galaxiesMap } from '@/lib/galaxiesMap'
import { FiExternalLink, FiUserPlus } from 'react-icons/fi'
import NavLink from '@/components/NavLink'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import HomeSidebar from '@/components/home/HomeSidebar'
import ClassicPosts from '@/components/post/ClassicPosts'
import Header from '@/components/layout/Header'
import PostsSidebar from '@/components/post/PostsSidebar'
import { QueryClient } from 'react-query'
import { globalPrefetch } from '@/lib/queries/globalPrefetch'
import { fetchPlanet } from '@/lib/queries/usePlanet'
import { dehydrate } from 'react-query/hydration'
import { fetchPosts } from '@/lib/queries/usePosts'

export default function HomePage() {
  const { push } = useRouter()

  const menuLeft = useRef(null)
  const menuRight = useRef(null)
  const panel = useRef(null)
  const headerRef = useRef(null)

  const [slideoutLeft, setSlideoutLeft] = useState(null)
  const [slideoutRight, setSlideoutRight] = useState(null)

  useEffect(() => {
    import('slideout').then(imp => {
      const Slideout = imp.default

      const paddingLeft = 320
      const paddingRight = 256

      const slideoutLeft = new Slideout({
        panel: panel.current,
        menu: menuLeft.current,
        padding: paddingLeft,
        tolerance: 70,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      })

      setSlideoutLeft(slideoutLeft)

      const slideoutRight = new Slideout({
        panel: panel.current,
        menu: menuRight.current,
        padding: paddingRight,
        tolerance: 70,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        side: 'right'
      })

      setSlideoutRight(slideoutRight)

      const header = headerRef.current

      slideoutLeft.on('translate', function (translated) {
        header.style.transform = `translateX(${translated}px)`
      })
      slideoutLeft.on('beforeopen', function () {
        header.style.transition = 'transform 300ms ease'
        header.style.transform = `translateX(${paddingLeft}px)`
        menuRight.current.classList.add('slideout-open--left')
        slideoutRight.disableTouch()
      })
      slideoutLeft.on('beforeclose', function () {
        header.style.transition = 'transform 300ms ease'
        header.style.transform = 'translateX(0px)'
      })
      slideoutLeft.on('open', function () {
        header.style.transition = ''
      })
      slideoutLeft.on('close', function () {
        header.style.transition = ''
        menuRight.current.classList.remove('slideout-open--left')
        slideoutRight.enableTouch()
      })

      slideoutRight.on('translate', function (translated) {
        header.style.transform = `translateX(${translated}px)`
      })
      slideoutRight.on('beforeopen', function () {
        header.style.transition = 'transform 300ms ease'
        header.style.transform = `translateX(${-paddingRight}px)`
        menuLeft.current.classList.add('slideout-open--right')
        slideoutLeft.disableTouch()
      })
      slideoutRight.on('beforeclose', function () {
        header.style.transition = 'transform 300ms ease'
        header.style.transform = 'translateX(0px)'
      })
      slideoutRight.on('open', function () {
        header.style.transition = ''
      })
      slideoutRight.on('close', function () {
        header.style.transition = ''
        menuLeft.current.classList.remove('slideout-open--right')
        slideoutLeft.enableTouch()
      })
    })
  }, [])

  return (
    <>
      <HomeSidebar ref={menuLeft} />

      <PostsSidebar ref={menuRight} />

      <Header slideoutLeft={slideoutLeft} ref={headerRef} />

      <main
        className="relative h-full w-full md:pl-76 md:pr-60 pt-12 slideout-panel"
        id="panel"
        ref={panel}
      >
        <ClassicPosts variables={{ joinedOnly: true, pageSize: 20 }} />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const { query } = ctx

  await globalPrefetch(queryClient, ctx)

  const k = [
    'posts',
    {
      joinedOnly: true,
      pageSize: 20,
      sort: query.sort ? query.sort.toUpperCase() : 'HOT',
      time: query.time ? query.time.toUpperCase() : 'ALL'
    }
  ]

  await queryClient.prefetchQuery(k, key => fetchPosts(key, ctx))

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
