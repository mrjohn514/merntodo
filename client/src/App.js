import React, { useState, useEffect } from 'react'

import Header from './components/partials/header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Register from './components/register'
import Login from './components/login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const info = localStorage.getItem('user')
  const [user, setUser] = useState(JSON.parse(info))
  console.log('app wala user', user)

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route
            path="/register"
            element={<Register user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
