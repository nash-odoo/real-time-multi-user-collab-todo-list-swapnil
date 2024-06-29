import React, { PropsWithChildren } from "react"

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col w-full min-h-dvh">
      <div>Navbar</div>
      {children}
      <div>footer</div>
    </div>
  )
}

export default DashboardLayout
