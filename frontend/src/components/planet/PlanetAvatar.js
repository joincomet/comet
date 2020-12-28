import { BiPlanet } from 'react-icons/bi'

export default function PlanetAvatar({ planet, className = 'w-10 h-10' }) {
  return (
    <div
      className={`select-none relative flex-shrink-0 rounded-full inline-flex ${className} ${
        planet.avatarUrl ? '' : 'bg-gray-200 dark:bg-gray-700'
      }`}
    >
      {planet.avatarUrl ? (
        <img
          alt={planet.name}
          src={planet.avatarUrl}
          className="rounded-full object-cover object-center"
        />
      ) : (
        <BiPlanet className="text-gray-500 w-1/2 h-1/2 m-auto" />
      )}
    </div>
  )
}
