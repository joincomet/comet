import React from 'react'

export default function PlanetAbout({ planet, className = '' }) {
  return (
    <div>
      <div className="text-xl font-bold tracking-tight leading-none mb-4 text-secondary">
        About <span className="">{planet.name}</span>
      </div>
      <div className="text-sm text-secondary font-medium">
        {planet.description || 'New Planet'}
      </div>
    </div>
  )
}
