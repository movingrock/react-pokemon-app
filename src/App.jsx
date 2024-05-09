import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DetailPage from "./pages/DetailPage"
import MainPage from "./pages/MainPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/pokemon/:id" element={<DetailPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
