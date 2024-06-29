import React from "react"
import './Home.css'
import Header from '@/components/Header'

const Home = () => {
  return <div>
    <Header></Header>

    <div>
      <div className="m-6 bg-[#FAF7F2] rounded-lg text-center ">
        
        <div className="flex flex-wrap">
          <div className="bg-red-300 rounded-lg w-1/12 h-32 p-3 m-auto">
            <div className="font-bold">Completed task</div>
            <div className="font-extrabold text-3xl">69</div>
            
          </div>
          <div className="bg-[#F2B258] font-bold rounded-lg w-1/12 h-32 p-3 m-auto">
            <div className="font-bold">Pending task</div>
            <div className="font-extrabold text-3xl">69</div>
          </div>
          <div className="bg-blue-400 rounded-lg w-9/12 h-32 m-auto">
            <div >Tasks created</div>
            <div>Active users</div>
          </div>
        </div>
      </div>
    </div>

  </div>
}

export default Home
