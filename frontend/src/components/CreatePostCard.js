import { FiEdit, FiLink, FiImage, FiSearch } from 'react-icons/fi'
import React, { useState } from 'react'

export default function CreatePostCard() {
  const [clicked, setClicked] = useState(false)

  return (
    <>
      <div
        onClick={() => setClicked(true)}
        className={`sm:rounded-md dark:bg-gray-800 bg-white px-8 py-5 mb-5 cursor-pointer shadow-lg z-20 relative`}
      >
        <div className="flex">
          <img
            src="https://pbs.twimg.com/profile_images/1312166598086598658/I2-2CTFg_400x400.jpg"
            className="w-12 h-12 rounded-full mr-8"
          />
          <div>
            <div className="text-base font-semibold inline-flex items-start">
              Share something with the community
              <FiEdit className="w-5 h-5 ml-5 text-tertiary" />
            </div>
            <div className="mt-1 text-xs font-mono text-tertiary">
              Post images, links, and text
            </div>
          </div>
        </div>

        <div
          className={`pt-5 space-y-5 sm:px-20 ${clicked ? 'block' : 'hidden'}`}
        >
          <input
            placeholder="Title"
            className={`w-full h-10 text-sm bg-gray-900 px-5 rounded-md shadow focus:outline-none border border-gray-900 focus:border-blue-500 transition duration-200 ease-in-out`}
          />

          <div className="inline-flex items-center relative flex-grow w-full">
            <input
              placeholder="Link URL"
              className={`w-full h-10 text-sm text-blue-500 bg-gray-900 px-12 rounded-md shadow focus:outline-none border border-gray-900 focus:border-blue-500 transition duration-200 ease-in-out`}
            />
            <FiLink
              style={{ top: '0.8125rem' }}
              className="h-4 w-4 absolute left-4 transform text-blue-500 transition duration-200 ease-in-out cursor-auto"
            />
          </div>

          <textarea
            style={{ minHeight: '8rem' }}
            placeholder="Write something..."
            className="resize-none w-full text-sm rounded-md overflow-y-hidden bg-gray-900 px-5 py-2 focus:outline-none border border-gray-900 focus:border-blue-500 transition duration-200 ease-in-out"
          />

          <div className="flex">
            <div className="text-blue-500 hover:text-white bg-transparent border border-blue-500 hover:bg-blue-500 transition duration-200 ease-in-out rounded-full text-sm font-medium px-5 py-1.5">
              Upload Images
            </div>

            <div
              onClick={e => {
                e.stopPropagation()
                setClicked(false)
              }}
              className="ml-auto hover:bg-gray-700 transition duration-200 ease-in-out text-tertiary text-sm font-medium rounded-full px-5 py-1.5"
            >
              Cancel
            </div>
            <div className="ml-6 text-white bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out rounded-full text-sm font-medium px-5 py-1.5">
              Post
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-10 h-full w-full transform transition ${
          clicked ? 'translate-x-0' : '-translate-x-full delay-150'
        }`}
      >
        <div
          className={`bg-black bg-opacity-50 h-full w-full transition duration-150 ease-in-out cursor-not-allowed ${
            clicked ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </>
  )
}
