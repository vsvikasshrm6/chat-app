import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SettingsPage from './Components/SettingsPage'
import Login from './Components/login'
import Profile from './Components/Profile'
import Signup from './Components/Signup'
import HomePage from './Components/HomePage'
import NavBar from './Components/NavBar'
import { authStore } from './store/authStore';
import {Loader} from "lucide-react"

function App() {
  const {authUser, checkAuth, isCheckingAuth} = authStore();
  useEffect(()=>{
    checkAuth();       
  }, [checkAuth])

  //

  if(isCheckingAuth && !authUser){
    return <div className='flex items-center justify-center h-screen'><Loader className="size-10 animate-spin"/></div>;
  }

  return (
    <div data-theme="dark">
      <NavBar/>
      <Routes>
        <Route path='/' element = {authUser? <HomePage/> : <Navigate to={"/login"}/>}></Route>
        {/* <Route path='/' element = {<HomePage/>}></Route> */}
        <Route path='/settings' element ={<SettingsPage/>}></Route>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/signup' element= {<Signup/>}></Route>
        <Route path='/profile' element = {authUser ? <Profile/> : <Navigate to={"/login"}/>}></Route>
        {/* <Route path='/profile' element = { <Profile/>}></Route> */}
      </Routes>
      
    </div>
  )
}

export default App
