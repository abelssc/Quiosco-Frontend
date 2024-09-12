import React, { useContext, useEffect, useState } from 'react'
import { getCategorias } from '../../services/categorias'
import CategoryItem from '../common/CategoryItem'
import clientAxios from '../../config/axios';
import { Link } from 'react-router-dom';
import { QuioscoContext } from '../../context/QuioscoContext';

const Sidebar = () => {
    const {user} = useContext(QuioscoContext);

    const [categorias, setCategorias] = useState([]);
    async function fetchCategorias() {
        try {
            const {data} = await getCategorias();
            if (data) {
                setCategorias(data);
            } else {
                console.error("Failed to fetch categories.");
            }
        } catch (error) {
            console.error("Error in fetchCategorias:", error.message);
        }
    }

    useEffect(() => {
        fetchCategorias();
        console.log('fetchCategorias');
    }, []);
    
    
    return (
        <aside className='w-[350px] flex-shrink-0'>
            <div className='p-4'>
                <Link to='/' className='block'>
                    <img src={'/img/logo.svg'} className='w-[200px] max-w-full mx-auto' />
                </Link>
            </div>
            <p className='text-center'>Hola {user?.name}</p>
            <ul className='mt-10'>
                {
                    user?.rol === 'admin' &&
                    <Link to={'/admin/pedidos'} className='block p-3 bg-gray-200 hover:bg-gray-300'>Administrar Pedidos</Link>
                }
                {
                    categorias.map(categoria =>
                        <CategoryItem categoria={categoria} key={categoria.id} />
                    )
                }
            </ul>
            <div className='p-4 my-4'>
                <button className='bg-red-500 text-white w-full rounded p-3 hover:bg-red-800'
                    onClick={async () => {
                        await clientAxios.post('/api/logout');
                        localStorage.removeItem('token');
                        window.location.href = '/auth/login';
                    }}
                >
                    Cerrar Sesion
                </button>
            </div>
        </aside>
    )
}

export default Sidebar