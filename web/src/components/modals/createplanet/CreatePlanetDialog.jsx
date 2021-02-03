import React from 'react'
import Dialog from '@/components/ui/Dialog'
import { useCreatePlanetMutation } from '@comet/core/mutations/planetMutations'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { galaxies } from '@comet/core/galaxies'
import IconPlanetCreate from '@/components/ui/icons/IconPlanetCreate'
import { useHistory } from 'react-router-dom'

const createBtn =
  'disabled:opacity-50 rounded-full h-8 px-6 label inline-flex items-center justify-center bg-blue-600 cursor-pointer transition transform hover:scale-105 focus:outline-none'
const error = 'tip text-red-400 mb-2'

export default function CreatePlanetDialog({ activator }) {
  let sOpen
  const createPlanetMutation = useCreatePlanetMutation({
    onSuccess: (result, variables) => {
      sOpen(false)
      push(`/planet/${variables.name}`)
    },
    onError: error => toast.error(error.response.errors[0].message)
  })

  const { handleSubmit, register, formState, errors, watch } = useForm({
    mode: 'onChange'
  })

  const { push } = useHistory()

  const onSubmit = async ({ name, description, galaxy }) => {
    createPlanetMutation.mutate({ name, description, galaxy })
  }

  return (
    <Dialog activator={activator}>
      {({ open, setOpen }) => {
        sOpen = setOpen
        return (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 lg:rounded-lg bg-white dark:bg-gray-750 space-y-4"
          >
            <div className="flex items-center">
              <IconPlanetCreate className={`w-6 h-6 mr-3 text-secondary`} />
              <div className="text-xl font-semibold text-secondary">
                Create a Planet
              </div>
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
              className="textbox"
              placeholder="Name"
            />

            <div className="flex justify-between space-x-3">
              <select
                name="galaxy"
                ref={register({
                  required: true,
                  validate: val => val !== 'none'
                })}
                className="textbox"
                defaultValue="none"
              >
                <option value="none" disabled hidden>
                  Galaxy
                </option>
                {galaxies.map(galaxy => (
                  <option key={galaxy} value={galaxy}>
                    {galaxy}
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
                  to="https://github.com/cometx-io/about/blob/master/CONTENT.md"
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
      }}
    </Dialog>
  )
}
