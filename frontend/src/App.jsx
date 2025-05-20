import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Settings from './Components/Settings'
import Login from './Components/login'
import Profile from './Components/Profile'
import Signup from './Components/Signup'
import HomePage from './Components/HomePage'
import NavBar from './Components/NavBar'

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element = {<HomePage/>}></Route>
        <Route path='/settingsPage' element ={<Settings/>}></Route>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/signup' element= {<Signup/>}></Route>
        <Route path='/profile' element = {<Profile/>}></Route>
      </Routes>
      
    </div>
  )
}

export default App
