import React from 'react'
import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from '../Components/Helper/ProtectedRoute'

import Point from '../Components/Point/Index';
import Auth from '../Components/Auth/Index'

const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path='/' element={<Point/>}/>
      </Route>

      <Route path="/login" element={<Auth />} />
    </Routes>
  )
}

export default Router;
