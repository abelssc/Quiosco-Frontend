import React from 'react'
import ProductCard from '../common/ProductCard'
import { getCategoryByUri } from '../../services/categorias';
import { getProductos } from '../../services/productos';
import { useLoaderData } from 'react-router-dom';
import useSWR from 'swr';
import clientAxios from '../../config/axios';

export async function loader({params}){
  const {data:category}=await getCategoryByUri(params.uri);
  //ya no es necesario porque SWR se encarga de hacer la peticion
  // const {data:productos}=await getProductos(category.id);
  // return {productos,category}
  return {category}
}


const Catalog = () => {
  const {category} = useLoaderData();

  const fetcher = async (url) => {
    // esperamos  2000ms antes de seguir ejecutando el resto
    // await new Promise(resolve => setTimeout(resolve, 2000));
    const {data} = await clientAxios.get(url);
    return data;
  }
  const {data, error, isLoading} = useSWR(`/api/productos/categoria/${category.id}`, fetcher);
  if(isLoading) return <div className='flex-grow bg-gray-200 p-4 overflow-y-scroll'>Cargando...</div>
  if(error) return <div className='flex-grow bg-gray-200 p-4 overflow-y-scroll'>Error al cargar los productos</div>
  const productos = data.data;
  
  return (
    <div className='flex-grow bg-gray-200 p-4 overflow-y-scroll'>
      <h1 className='font-bold text-5xl'>{category.nombre}</h1>
      <p className='my-4'>Elige y personaliza tu pedido a continuaci&oacute;n</p>
      <div className='grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 '>
        {
          productos.map(producto => 
           <ProductCard producto={producto} key={producto.id} />
          )
        }
      </div>

    </div>
  )
}

export default Catalog