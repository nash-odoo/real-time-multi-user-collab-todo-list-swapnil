import Footer from "@/components/Footer"
import Header from "@/components/Header"
import React, { PropsWithChildren } from "react"

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col w-full min-h-dvh">
      <Header />

      {children}
      <Footer />
    </div>
  )
}

export default DashboardLayout
