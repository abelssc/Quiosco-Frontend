import React from 'react'
import { ToastContainer } from 'react-toastify'
import Sidebar from '../components/admin/Sidebar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='w-full h-screen flex'>
      <Sidebar />
      <Outlet />
      <ToastContainer />
    </div>
  )
}

export default Admin