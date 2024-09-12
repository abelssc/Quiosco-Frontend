import React from 'react'
import useSWR from 'swr'
import clientAxios from '../../config/axios';
import { formatearDinero } from '../../utils/helpers';
import { toast } from 'react-toastify';

function Pedidos() {

    const fetcher=async(url)=>{
        const {data} = await clientAxios.get(url);
        return data;
    }
    const {data,error,isLoading,mutate}=useSWR('/api/pedidos',fetcher);
    if(isLoading) return <div className='flex-grow bg-gray-200 p-4 overflow-y-scroll'>Cargando...</div>
    if(error) return <div className='flex-grow bg-gray-200 p-4 overflow-y-scroll'>Error al cargar los productos</div>
    const pedidos=data.data;

    const handleCheck=async(e,id)=>{
        const {name,checked}=e.target;
        // Actualización optimista: modifica el estado localmente antes de enviar la petición
        // para que el usuario vea el cambio de manera inmediata
        const newPedidos = pedidos.map((pedido) =>
            pedido.id === id ? { ...pedido, [name]: checked } : pedido
        );
        console.log({ ...data, data: newPedidos });
        
        // Actualiza el estado de manera optimista usando mutate
        mutate({ ...data, data: newPedidos }, false);
        try {
            const {data}=await clientAxios.put(`/api/pedidos/${id}`,{[name]:checked});            
            // Refresca los datos tras la confirmación del servidor
            await mutate();
            // exec toast
            toast.success(data.message);
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar el pedido');
        }
    }

  return (
    <div className='flex-grow bg-gray-200 p-4 overflow-y-scroll'>
        <h1 className='font-bold text-5xl'>Pedidos Pendientes</h1>
        <div className='grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 '>
        {
          pedidos.map(pedido => 
            <div className='p-2 border rounded bg-white hover:scale-105 transition-transform' key={pedido.id}>
                <div className='my-4'>
                    <h2 className='font-semibold text-xl text-center'>Pedido #{pedido.id}</h2>
                    <p className='text-gray-400 text-center'>Cliente: {pedido.cliente}</p>
                    <p className='text-gray-400 text-center'>{pedido.created_at}</p>
                </div>
                <div className='flex flex-col gap-4'>
                    {
                        pedido.productos.map(producto=>
                            <div className='flex gap-4' key={producto.id}>
                                <div className='w-[80px]'>
                                    <img src={`/img/${producto.imagen}.jpg`} className='w-full' />
                                </div>
                                <div>
                                    <h2 className='font-semibold'>{producto.nombre}</h2>
                                    <p className=''>P.unit: {formatearDinero(producto.precio*1)}</p>
                                    <p>Cant: {producto.cantidad}</p>
                                    <p>SubTotal: {formatearDinero(producto.precio*producto.cantidad)}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='my-4 border-y py-4'>
                    <p className='bold text-xl '>Total:{" "}
                        <span className='text-blue-800 font-bold'>
                            {formatearDinero(pedido.productos.reduce((acc,producto)=>acc+producto.precio*producto.cantidad,0))}
                        </span>
                    </p>
                    
                </div>
                {/* create CHECK ACTION   for pagado y entregado */}
                <div className='mb-2'>
                    <label>Pagado {" "}
                        <input type='checkbox' name='pagado' checked={pedido.pagado} 
                            onChange={(e)=>handleCheck(e,pedido.id)}
                        />
                    </label>
                </div>
                <div>
                    <label>Entregado {" "}
                        <input type='checkbox' name='entregado' checked={pedido.entregado}
                            onChange={(e)=>handleCheck(e,pedido.id)}
                        />
                    </label>
                </div>

            </div>
          )
        }
      </div>
    </div>
  )
}

export default Pedidos