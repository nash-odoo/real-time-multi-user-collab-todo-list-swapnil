import { PropsWithChildren } from "react"

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      {children}
    </main>
  )
}

export default AuthLayout
