import React from "react"
import './Home.css'
import Header from '@/components/Header'
import Footer from "@/components/Footer"

const Home = () => {
  return <div>
    <Header></Header>

    <div>
      <div className="m-6 p-4 bg-[#FAF7F2] rounded-lg text-center ">

        <div className="flex flex-wrap text-white p-3">
          <div className="bg-red-300 rounded-lg drop-shadow-lg w-1/12 min-w-28 h-32  p-2 m-auto">
            <div className="font-bold">Completed task</div>
            <div className="font-extrabold text-3xl">69</div>

          </div>
          <div className="bg-[#F2B258] rounded-lg drop-shadow-lg w-1/12 min-w-28 h-32 p-2 m-auto">
            <div className="font-bold">Pending task</div>
            <div className="font-extrabold text-3xl">69</div>
          </div>
          <div className="bg-blue-400 rounded-lg drop-shadow-lg w-9/12 h-32 m-auto my-4 p-2 flex justify-between">
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

    <Footer></Footer>
    
  </div>
}

export default Home
