import PlanetAvatar from '@/components/planet/PlanetAvatar'
import React from 'react'
import PlanetJoinButton from '@/components/planet/PlanetJoinButton'
import SubHeaderBase from '@/components/layout/SubHeaderBase'
import NavLink from '@/components/NavLink'

export default function PlanetHeader({ planet, show }) {
  return (
    <SubHeaderBase show={show}>
      <NavLink
        href={`/planet/${planet.name}`}
        className="inline-flex items-center"
      >
        <PlanetAvatar planet={planet} />
        <div className="ml-4 text-xl font-bold tracking-tight leading-none">
          +{planet.name}
        </div>
      </NavLink>

      <div className="ml-auto">
        <PlanetJoinButton planet={planet} />
      </div>
    </SubHeaderBase>
  )
}
