import React from 'react'
import { NavLink } from 'react-router-dom'

const CategoryItem = ({ categoria }) => {
    return (
        <li>
            <NavLink
                to={`/category/${categoria.uri}`}
                className={({ isActive, isPending }) =>
                    isActive
                        ? "flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer bg-amber-400"
                        : isPending
                            ? "flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer bg-gray-400"
                            : "flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer"
                }
            >
                <img src={`/img/icono_${categoria.icono}.svg`} width={'50px'} />
                <p>{categoria.nombre}</p>
            </NavLink>
        </li>
    )
}

export default CategoryItem