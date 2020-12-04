import { FaUserAstronaut } from 'react-icons/fa'

export default function Astronaut({ className }) {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 rounded-full ${className}`}>
      <FaUserAstronaut size={28} />
    </div>
  )
}
