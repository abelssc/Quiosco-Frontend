import React, { useContext, useEffect, useState } from 'react'
import { formatearDinero } from '../../utils/helpers'
import { QuioscoContext } from '../../context/QuioscoContext';
import { ModalContext } from '../../context/ModalContext';
const ProductModal = () => {
    const [cantidad, setCantidad] = useState(1);
    const {handleCloseModal} = useContext(ModalContext);
    
    const { productSelected,handleAddPedido,handleEditPedido,pedidos } = useContext(QuioscoContext);
    const { id, nombre, precio, imagen } = productSelected;

    const pedidoRepetido=pedidos.find(({producto})=>producto.id===productSelected.id);

    useEffect(() => {
        if(pedidoRepetido){
            setCantidad(pedidoRepetido.cantidad);
        }
    }, []);
    

    return (
        <div className='flex gap-10'>
            <div className='w-[250px]'>
                <img src={`/img/${imagen}.jpg`} className='w-full' />
            </div>
            <div>
                <h2 className='font-semibold text-2xl'>{nombre}</h2>
                <p className='text-4xl text-orange-400 my-3 font-bold'>{formatearDinero(precio)}</p>
                <div className='flex items-stretch'>
                    <button
                        className='w-[30px] h-[30px] flex justify-center items-center bg-gray-100 font-bold text-2xl'
                        onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                    >
                        -
                    </button>
                    <div className='w-[50px] text-center border flex justify-center items-center'>{cantidad}</div>
                    <button
                        className='w-[30px] h-[30px] flex justify-center items-center bg-gray-100 font-bold text-2xl'
                        onClick={() => setCantidad(cantidad + 1)}
                    >
                        +
                    </button>
                </div>
                <button
                    className='w-full bg-blue-600 text-white font-bold p-2 mt-8 rounded hover:bg-blue-800'
                    onClick={()=>{
                        if(pedidoRepetido){
                            handleEditPedido(pedidoRepetido.id,{producto:productSelected,cantidad,id:pedidoRepetido.id})
                        }else{
                            handleAddPedido({producto:productSelected,cantidad});
                        }
                        handleCloseModal();
                    }}
                >
                    {
                        (pedidoRepetido)
                            ?'GUARDAR CAMBIOS'
                            :'AÑADIR PEDIDO'
                    }
                </button>

            </div>
        </div>
    )
}

export default ProductModal