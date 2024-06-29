import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Error404 from "./pages/404"

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/404" element={<Error404 />} />

        
      </Routes>
    </>
  )
}

export default App
