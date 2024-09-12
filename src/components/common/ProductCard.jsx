import React, { useContext } from 'react'
import { formatearDinero } from '../../utils/helpers'
import { ModalContext } from '../../context/ModalContext'
import { QuioscoContext } from '../../context/QuioscoContext';

const ProductCard = ({producto}) => {
    const {handleOpenModal}= useContext(ModalContext);
    const {handleClickSetProduct} = useContext(QuioscoContext);

    return (
        <div className='p-2 border rounded bg-white hover:scale-105 transition-transform'>
            <img src={`/img/${producto.imagen}.jpg`} className='w-full' />
            <h2 className='font-semibold text-lg line-clamp-2 h-[56px]'>{producto.nombre}</h2>
            <p className='text-2xl text-orange-400 my-3 font-bold'>{formatearDinero(producto.precio)}</p>
            <button 
                className='w-full bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-800'
                onClick={async ()=>{
                    await handleClickSetProduct(producto.id);                
                    handleOpenModal();
                }}
            >
                AGREGAR
            </button>
        </div>
    )
}

export default ProductCard