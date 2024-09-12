import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='h-dvh flex items-center gap-8'>
        <div className='w-1/2'>
            <img src={'/img/logo.svg'} className='w-[400px] max-w-full ml-auto' />
        </div>
        <div className='w-1/2'>
            <Outlet />
        </div>
    </div>
  )
}

export default Auth