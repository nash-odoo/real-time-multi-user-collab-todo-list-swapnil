import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import Error404 from "./pages/404"


function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route path="/404" element={<Error404 />} />

      </Routes>
    </>
  )
}

export default App
