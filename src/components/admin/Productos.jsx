import React, { useEffect, useState } from 'react'
import clientAxios from '../../config/axios';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

function Productos() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const getProductos=async()=>{
      const {data:productos}=await clientAxios.get('/api/productos');
      setProductos(productos.data);
    }
    getProductos();
  }, []);

  const handleProductoEstado=async (id,estado)=>{
    const confirmar=confirm(`¿Estas seguro de ${estado?'habilitar':'deshabilitar'} este producto?`);
    if(confirmar){
      const {data}=await clientAxios.put(`/api/productos/${id}`,{estado});
      toast.success(data.message);
      // actualizamos el estado del producto
      setProductos(productos.map(p=>p.id===id?{...p,estado}:p));
    }
  }
  

  return (
    <div className='flex-grow bg-gray-200 p-4 overflow-y-scroll'>
      <h1 className='font-bold text-5xl'>Administracion de Productos</h1>
      <div className='grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 '>
          {
            productos.map(producto=>{
              return (
                <ProductoCard producto={producto} key={producto.id} handleProductoEstado={handleProductoEstado} />
              )
            })
          }
      </div>
    </div>
  )
}
function ProductoCard({producto,handleProductoEstado}){
  
  return (
    <div key={producto.id} className='p-2 border rounded bg-white hover:scale-105 transition-transform'>
      <img src={`/img/${producto.imagen}.jpg`} className='w-full' />
      <h2 className='font-semibold text-lg line-clamp-2 h-[56px]'>{producto.nombre}</h2>
      <p className='text-2xl text-orange-400 my-3 font-bold'>{producto.precio}</p>

        {
          producto.estado ? 
           <button
        className='w-full bg-red-400 text-white font-bold p-2 rounded hover:bg-red-500'
        onClick={()=>handleProductoEstado(producto.id,false)}
      >
        Deshabilitar
      </button>
          :
          <button
        className='w-full bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-800'
        onClick={()=>handleProductoEstado(producto.id,true)}
      >
        Habilitar
      </button>
        }
    </div>
  )
}

export default Productos