import { PropsWithChildren } from "react"

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="h-screen flex flex-col items-center justify-center px-3 bg-[#C4A49F]">
      {children}
    </main>
  )
}

export default AuthLayout
