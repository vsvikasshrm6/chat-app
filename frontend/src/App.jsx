import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SettingsPage from './Components/SettingsPage'
import Login from './Components/login'
import Profile from './Components/Profile'
import SignUpPage from './Components/SignupPage'
import HomePage from './Components/HomePage'
import NavBar from './Components/NavBar'
import { authStore } from './store/authStore';
import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'
import LoginPage from './Components/login'
import { useThemeStore } from './store/useThemeStore'

function App() {
  const {authUser, checkAuth, isCheckingAuth} = authStore();
  const {Theme} = useThemeStore();
  
  useEffect(()=>{
    checkAuth();       
  }, [checkAuth])

  //

  if(isCheckingAuth && !authUser){
    return <div className='flex items-center justify-center h-screen'><Loader className="size-10 animate-spin"/></div>;
  }
  
  return (
    <div data-theme={Theme}>
      <NavBar/>
      <Routes>
        <Route path='/' element = {authUser? <HomePage/> : <Navigate to={"/login"}/>}></Route>
        <Route path='/settings' element ={<SettingsPage/>}></Route>
        <Route path='/login' element = {!authUser? <LoginPage/> : <Navigate to={"/"}/>}></Route>
        <Route path='/signup' element= {!authUser? <SignUpPage/> : <Navigate to={"/"}/>}></Route>
        <Route path='/profile' element = {authUser ? <Profile/> : <Navigate to={"/login"}/>}></Route>
      </Routes>
      <Toaster></Toaster>
      
    </div>
  )
}

export default App
