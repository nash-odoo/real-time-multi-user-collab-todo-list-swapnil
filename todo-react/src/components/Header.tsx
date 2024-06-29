import React from 'react'

export default function Header() {
  return (
    <div className="mx-auto max-w-7x2 px-2 sm:px-6 lg:px-8 p-2 m-0 h-24 rounded-lg bg-slate-50 drop-shadow-xl flex flex-wrap justify-items-start">
      <div className="flex">
        <div>svg</div>
        <div className="flex-1 font-extrabold text-4xl text-[#F87777] align-middle">To-do list</div>
      </div>
      <div className="flex-1 text-end">user</div>
    </div>
  )
}
