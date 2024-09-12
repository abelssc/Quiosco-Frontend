import React, { useContext, useState } from 'react'
import { formatearDinero } from '../../utils/helpers';
import { QuioscoContext } from '../../context/QuioscoContext';
import { ModalContext } from '../../context/ModalContext';

const Cart = () => {
  const {pedidos,handleRemovePedido,handleClickSetProduct,handleSendPedidos } = useContext(QuioscoContext);
  const {handleOpenModal} = useContext(ModalContext);

  return (
    <aside className='w-[350px] flex-shrink-0 overflow-y-scroll p-5'>
      <h2 className='text-4xl font-bold'>Mis Pedidos</h2>
      <p className='my-4'>Aqu&iacute; podr&aacute;s ver el resumen y totales de tu pedido</p>
      {
        pedidos.length
          ? (
            <>
              <ul>
                {
                  pedidos.map(({producto,cantidad,id}) => (
                    <li className='flex gap-2 border-b py-4' key={id}>
                      <div className='w-[100px] shrink-0'>
                        <img src={`/img/${producto.imagen}.jpg`} className='w-full' />
                      </div>
                      <div className='grow flex flex-col justify-between'>
                        <h2 className='font-semibold'>{producto.nombre}</h2>
                        <p className='text-xl text-orange-400 font-bold'>{formatearDinero(producto.precio)}</p>
                        <p>Cant: {cantidad}</p>
                        <p>SubTotal: {formatearDinero(cantidad*producto.precio)}</p>
                      </div>
                      <div className='w-[25px] shrink-0 flex flex-col justify-center gap-2'>
                        <button onClick={async ()=>{
                              await handleClickSetProduct(producto.id);
                              handleOpenModal();
                        }}>
                          <svg className='w-[25px] hover:stroke-yellow-400' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#666">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button onClick={()=>handleRemovePedido(id)}>
                          <svg className='w-[25px] hover:stroke-red-400' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#666">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <div>
                <p className='my-4 text-xl  '>Total: 
                  <span className='text-blue-800 font-bold'>
                    {formatearDinero(pedidos.reduce((acc,pedido)=>acc+pedido.producto.precio*pedido.cantidad,0))}
                  </span>
                </p>
                <button
                  className='w-full bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-800'
                  onClick={handleSendPedidos}
                >
                  CONFIRMAR PEDIDO
                </button>
              </div>
            </>
          )
          : <p className='text-6xl font-light'>Carrito vacio</p>
      }

    </aside>
  )
}

export default Cart