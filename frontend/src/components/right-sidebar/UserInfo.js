import React from 'react'

export default function UserInfo() {
  return (
    <div className="flex flex-col items-center flex-grow py-5 mx-4 border-b border-gray-200 dark:border-gray-700">
      <img
        className="w-24 h-24 transition duration-150 ease-in-out transform bg-indigo-500 border-2 border-blue-500 rounded-full cursor-pointer hover:scale-105"
        src="https://pbs.twimg.com/profile_images/1312166598086598658/I2-2CTFg_400x400.jpg"
      />
      <div className="inline-flex items-center mt-3 text-lg font-semibold">
        Dan Beneventano
        <span className="flex w-3 h-3 ml-3 cursor-pointer">
          <span className="absolute inline-flex w-3 h-3 p-1 bg-green-500 rounded-full opacity-75 animate-online" />
          <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full" />
        </span>
      </div>
      <div className="font-medium mt-0.5 text-tertiary text-sm ">@Dan</div>
    </div>
  )
}
