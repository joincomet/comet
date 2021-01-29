import React from 'react'
import HomeSidebar from '@/components/sidebars/HomeSidebar'
import Posts from '@/components/post/Posts'
import Header from '@/components/ui/header/Header'
import FoldersSidebar from '@/components/sidebars/FoldersSidebar'
import { HiFolder } from 'react-icons/hi'
import HeaderNewPostButton from '@/components/ui/header/HeaderNewPostButton'
import CreatePostDialog from '@/components/modals/createpost/CreatePostDialog'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function HomePage() {
  const query = useParams()

  const variables = {
    joinedOnly: true,
    pageSize: 20,
    page: query.page ? query.page - 1 : 0,
    sort: query.sort ? query.sort.toUpperCase() : 'HOT',
    time: query.time ? query.time.toUpperCase() : 'ALL'
  }

  return (
    <div className="swiper-container">
      <Swiper>
        <SwiperSlide style={{ width: '240px !important' }}>
          Menu slide
        </SwiperSlide>

        <SwiperSlide className="swiper-slide content">
          Content slide
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
