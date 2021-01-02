import React from 'react'
import { useForm } from 'react-hook-form'
import { useCreatePlanetMutation } from '@/lib/mutations/planetMutations'
import { galaxiesMap } from '@/lib/galaxiesMap'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const createBtn =
  'disabled:opacity-50 rounded-full h-8 px-6 label inline-flex items-center justify-center bg-blue-600 cursor-pointer transition transform hover:scale-105 focus:outline-none'
const error = 'tip text-red-400 mb-2'

export default function CreatePlanetForm({ setOpen }) {
  const createPlanetMutation = useCreatePlanetMutation({
    onSuccess: (result, variables) => {
      setOpen(false)
      push(`/planet/${variables.name}`)
    },
    onError: error => toast.error(error.response.errors[0].message)
  })

  const { handleSubmit, register, formState, errors, watch } = useForm({
    mode: 'onChange'
  })

  const galaxy1 = watch('galaxy1')
  const galaxy2 = watch('galaxy2')
  const galaxy3 = watch('galaxy3')

  const { push } = useRouter()

  const onSubmit = async ({ name, description, galaxy1, galaxy2, galaxy3 }) => {
    const galaxies = [galaxy1]
    if (galaxy2 !== 'none') galaxies.push(galaxy2)
    if (galaxy3 !== 'none') galaxies.push(galaxy3)
    createPlanetMutation.mutate({ name, description, galaxies })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 md:rounded-2xl bg-white dark:bg-gray-800 space-y-4"
    >
      <div className="header-2 text-secondary">Create a Planet</div>

      <div className="text-secondary text-base">
        Planets are communities dedicated to a single topic. Users can join
        planets to get the planet's posts on their home page.
      </div>

      <div className={error}>
        {errors.name?.type === 'required' && 'Planet name is required'}
        {errors.name?.type === 'pattern' &&
          'Planet name can only have letters, numbers, and underscores'}
        {(errors.name?.type === 'maxLength' ||
          errors.name?.type === 'minLength') &&
          'Planet name must be betweeen 3 and 21 characters'}
      </div>
      <input
        ref={register({
          required: true,
          minLength: 3,
          maxLength: 21,
          pattern: /^[a-zA-Z0-9_]+$/
        })}
        name="name"
        className="w-full dark:bg-gray-900 h-12 rounded focus:outline-none px-3"
        placeholder="Planet name"
      />

      <div className={error}>
        {errors.name?.type === 'required' && 'Description is required'}
      </div>
      <textarea
        ref={register({ required: true })}
        name="description"
        className="w-full dark:bg-gray-900 h-24 rounded resize-none focus:outline-none focus:ring-0 border-none p-3"
        placeholder="Planet description"
      />

      <div className="flex justify-between space-x-3">
        <select
          name="galaxy1"
          ref={register({ required: true, validate: val => val !== 'none' })}
          className="rounded dark:bg-gray-900 border-none focus:ring-0 w-1/3 text-sm font-medium h-10"
          defaultValue="none"
        >
          <option value="none" disabled hidden>
            Galaxy 1
          </option>
          {Object.keys(galaxiesMap)
            .filter(val => val !== galaxy2 && val !== galaxy3)
            .map(galaxy => (
              <option key={galaxy} value={galaxy}>
                {galaxiesMap[galaxy]}
              </option>
            ))}
        </select>

        <select
          name="galaxy2"
          ref={register}
          className="rounded dark:bg-gray-900 border-none focus:ring-0 w-1/3 text-sm font-medium h-10 disabled:opacity-50 transition"
          defaultValue="none"
          disabled={galaxy1 === 'none'}
        >
          <option value="none">Galaxy 2 (Optional)</option>
          {Object.keys(galaxiesMap)
            .filter(val => val !== galaxy1 && val !== galaxy3)
            .map(galaxy => (
              <option key={galaxy} value={galaxy}>
                {galaxiesMap[galaxy]}
              </option>
            ))}
        </select>

        <select
          name="galaxy3"
          ref={register}
          className="rounded dark:bg-gray-900 border-none focus:ring-0 w-1/3 text-sm font-medium h-10 disabled:opacity-50 transition"
          defaultValue="none"
          disabled={galaxy2 === 'none'}
        >
          <option value="none">Galaxy 3 (Optional)</option>
          {Object.keys(galaxiesMap)
            .filter(val => val !== galaxy1 && val !== galaxy2)
            .map(galaxy => (
              <option key={galaxy} value={galaxy}>
                {galaxiesMap[galaxy]}
              </option>
            ))}
        </select>
      </div>

      <div>
        <div className="flex">
          <button
            type="submit"
            disabled={!formState.isValid}
            className={`ml-auto ${createBtn}`}
          >
            Create Planet
          </button>
        </div>

        <div className="tip text-tertiary mt-4 text-right">
          Read the{' '}
          <a
            href="https://github.com/cometx-io/about/blob/master/CONTENT.md"
            rel="noopener noreferrer"
            target="_blank"
            className="text-accent cursor-pointer hover:underline"
          >
            Content Policy
          </a>{' '}
          before creating a planet
        </div>
      </div>
    </form>
  )
}
