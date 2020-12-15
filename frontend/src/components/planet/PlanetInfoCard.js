import Image from 'next/image'
import PlanetAvatar from '@/components/planet/PlanetAvatar'
import React from 'react'

export default function PlanetInfoCard({ planet }) {
  return (
    <div className="card mb-3">
      <div className="w-full h-12 relative">
        {planet.bannerUrl ? (
          <Image
            src={planet.bannerUrl}
            layout="fill"
            className="object-cover object-center rounded-t-lg"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-400 to-blue-500 rounded-t-lg" />
        )}
      </div>

      <div className="p-3">
        <div className="flex">
          <PlanetAvatar className="w-12 h-12" planet={planet} />

          <div className="ml-3">
            <div className="font-medium text-primary">{planet.name}</div>

            <div className="text-secondary text-sm">{planet.description}</div>
          </div>

          <div className="ml-auto px-4 h-9 rounded bg-blue-600 text-sm inline-flex items-center cursor-pointer transition hover:bg-blue-600">
            Join
          </div>
        </div>

        <div className="">{planet.userCount} Members</div>
      </div>
    </div>
  )
}
