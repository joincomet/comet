import React from 'react'

export default function PlanetAbout({ planet, className = '' }) {
  return (
    <div>
      <div className="text-xl font-bold tracking-tight leading-none mb-4 text-secondary">
        About <span className="">{planet.name}</span>
      </div>
      <div className="whitespace-pre-wrap prose prose-sm dark:prose-dark text-secondary">
        {planet.description || 'New Planet'}
      </div>
    </div>
  )
}
