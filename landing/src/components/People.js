import { useEffect, useState } from 'react'
import { motion, useTransform, animate, useMotionValue } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const people = [
  {
    name: 'Benjamin Franklin',
    description: 'Founding Father of the United States',
    avatar: '/people/BF.jpg'
  },
  {
    name: 'Martin Luther King Jr.',
    description: 'Civil rights activist',
    avatar: '/people/MLK.jpg'
  },
  {
    name: 'Abraham Lincoln',
    description: '16th U.S. President during the Civil War.',
    avatar: '/people/AL.jpg'
  },
  {
    name: 'Susan B. Anthony',
    description: "Women's Suffrage Movement Leader",
    avatar: '/people/SBA.jpg'
  },
  {
    name: 'Nelson Mandela',
    description: 'Former President of South Africa.',
    avatar: '/people/NM.jpg'
  },
  {
    name: 'Mahatma Gandhi',
    description:
      "Indian lawyer, anti-colonial nationalist, and political ethicist, who employed nonviolent resistance to lead the successful campaign for India's independence from British rule.",
    avatar: '/people/G.jpg'
  },
  {
    name: 'Elizabeth Cady Stanton',
    description: "leader of the women's rights movement in the U.S.",
    avatar: '/people/ES.jpg'
  },
  {
    name: 'John F. Kennedy',
    description: '35th U.S. President.',
    avatar: '/people/JFK.jpg'
  },
  {
    name: 'Socrates',
    description:
      'Greek philosopher from Athens who is credited as one of the founders of Western philosophy.',
    avatar: '/people/SOC.jpg'
  },
  {
    name: 'Rosa Parks',
    description:
      'American activist in the civil rights movement best known for her pivotal role in the Montgomery bus boycott.',
    avatar: '/people/RP.jpg'
  },
  {
    name: 'Frederick Douglass',
    description: 'American abolitionist & author of self-titled autobiography.',
    avatar: '/people/FD.jpg'
  },
  {
    name: 'Thomas Paine',
    description:
      'English-born American political activist, philosopher, political theorist, and revolutionary.',
    avatar: '/people/TP.jpg'
  },
  {
    name: 'Galileo Galilei',
    description: 'Astronomer',
    avatar: '/people/GAL.jpg'
  }
]

function Person({ person, base, index, total }) {
  const x = useTransform(
    base,
    [0, (100 / total) * (index + 1), (100 / total) * (index + 1), 100],
    [
      '0%',
      `${(index + 1) * -100}%`,
      `${total * 100 - (index + 1) * 100}%`,
      '0%'
    ]
  )

  return (
    <motion.li className="px-1.5" style={{ x }}>
      <div className="rounded-md px-6 w-80 py-3 shadow-md inline-flex items-center bg-gray-800 transform duration-300 hover:scale-105 cursor-pointer hover:shadow-xl">
        <img
          src={person.avatar}
          alt={person.name}
          className="object-cover object-center rounded-full shadow-md w-14 h-14 mr-6"
        />
        <div className="text-sm">
          <div className="font-medium">{person.name}</div>
          <div className="line-clamp-1 text-tertiary">{person.description}</div>
        </div>
      </div>
    </motion.li>
  )
}

export function People() {
  const x = useMotionValue(0)
  const { inView, ref: inViewRef } = useInView({
    threshold: 0,
    rootMargin: '100px'
  })
  const [duration, setDuration] = useState(150)

  useEffect(() => {
    if (!inView) return

    const controls = animate(x, 100, {
      type: 'tween',
      duration,
      ease: 'linear',
      loop: Infinity
    })

    return controls.stop
  }, [inView, x, duration])

  return (
    <div ref={inViewRef} className="w-full">
      <div className="flex overflow-hidden -my-8">
        <ul className="flex items-center w-full py-8">
          {people.map((person, i) => (
            <Person
              key={i}
              person={person}
              base={x}
              index={i}
              total={people.length}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
