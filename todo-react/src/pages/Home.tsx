import React from "react"
import './Home.css'
import Header from '@/components/Header'

const Home = () => {
  return <div>
    <Header></Header>

    <div>
      <div className="m-6 p-4 bg-[#FAF7F2] rounded-lg text-center ">

        <div className="flex flex-wrap text-white">
          <div className="bg-red-300 rounded-lg w-1/12 min-w-28 h-32 p-3 m-auto">
            <div className="font-bold">Completed task</div>
            <div className="font-extrabold text-3xl">69</div>

          </div>
          <div className="bg-[#F2B258] rounded-lg w-1/12 min-w-28 h-32 p-3 m-auto">
            <div className="font-bold">Pending task</div>
            <div className="font-extrabold text-3xl">69</div>
          </div>
          <div className="bg-blue-400 rounded-lg w-9/12 h-32 m-auto p-3 flex justify-between">
            <div>
              <div className="font-bold">Tasks created</div>
              <div className="font-extrabold text-6xl">69</div>
            </div>
            <div>
              <div className="font-bold">Active users</div>
              <div className="font-extrabold text-6xl">69</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}

    <div className="flex flex-wrap justify-between fixed bottom-0 rounded-lg bg-slate-50 drop-shadow-xl h-16 w-full p-4">
      <div className="font-extrabold text-2xl text-[#F87777]">To-do list</div>
      <div>@Odoo hackathon 2024</div>
      <div>social links</div>
    </div>

  </div>
}

export default Home
