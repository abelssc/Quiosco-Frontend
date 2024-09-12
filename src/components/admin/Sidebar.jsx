import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function Sidebar() {
    const {user}= useAuth();

  return (
    <aside className='w-[350px] flex-shrink-0'>
        <div className='p-4'>
                <Link to='/admin' className='block'>
                    <img src={'/img/logo.svg'} className='w-[200px] max-w-full mx-auto' />
                </Link>
        </div>
        <p className='text-center'>{user?.name}</p>
        <ul className='mt-10'>
        <li>
            <Link to={'/'} className='block p-3 bg-gray-200 hover:bg-gray-300'>Inicio</Link>
            <NavLink
                to={`/admin/pedidos`}
                className={({ isActive, isPending }) =>
                    isActive
                        ? "flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer bg-amber-400"
                        : isPending
                            ? "flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer bg-gray-400"
                            : "flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer"
                }
            >
                {/* <img src={`/img/icono_${categoria.icono}.svg`} width={'50px'} /> */}
                <p>Pedidos</p>
            </NavLink>
        </li>
        <li>
            <NavLink
                to={`/admin/productos`}
                className={({ isActive, isPending }) =>
                    isActive
                        ? "flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer bg-amber-400"
                        : isPending
                            ? "flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer bg-gray-400"
                            : "flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer"
                }
            >
                {/* <img src={`/img/icono_${categoria.icono}.svg`} width={'50px'} /> */}
                <p>Productos</p>
            </NavLink>
        </li>
        </ul>
      </aside>
  )
}

export default Sidebar