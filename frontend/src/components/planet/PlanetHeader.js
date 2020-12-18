import PlanetAvatar from '@/components/planet/PlanetAvatar'
import React from 'react'
import PlanetJoinButton from '@/components/planet/PlanetJoinButton'
import SubHeaderBase from '@/components/SubHeaderBase'

export default function PlanetHeader({ planet, show }) {
  return (
    <SubHeaderBase show={show}>
      <PlanetAvatar planet={planet} />
      <div className="ml-4 text-xl font-bold tracking-tight leading-none">
        {planet.name}
      </div>

      <div className="ml-auto">
        <PlanetJoinButton planet={planet} />
      </div>
    </SubHeaderBase>
  )
}
