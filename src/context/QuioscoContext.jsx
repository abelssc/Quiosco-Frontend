import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from "react";
import { getProducto } from "../services/productos";
import { toast } from 'react-toastify';
import clientAxios from '../config/axios';
import { useAuth } from '../hooks/useAuth';

export const QuioscoContext = createContext();

export const QuioscoProvider = ({children})=>{
    const {user} = useAuth();
    const [productSelected,setProductSelected]=useState({
        id:0,
        nombre:'',
        precio:0,
        imagen:'',
        categoria_id:0
    });
    const [pedidos, setPedidos] = useState([]);

    const handleClickSetProduct=async(id)=>{
        const {data:producto}=await getProducto(id);
        setProductSelected(producto)
    }
    const handleAddPedido=(pedido)=>{
        const id=uuidv4();
        const nuevoPedido = { ...pedido, id };
        setPedidos([...pedidos,nuevoPedido]);
        toast.success('Agregado al Pedido')
    }
    const handleEditPedido=(id,pedidoEdited)=>{
        setPedidos(pedidos.map(pedido=>
            (pedido.id===id)
            ? pedidoEdited
            : pedido
        ));
        toast.success('Guardado Correctamente')
    }
    const handleRemovePedido=(id)=>{
        setPedidos(pedidos.filter(p=>p.id!==id));
        toast.success('Eliminado del Pedido')
    }
    const handleSendPedidos=async()=>{
        const productos=pedidos.map(pedido=>({
            id:pedido.producto.id,
            cantidad:pedido.cantidad,
            precio:pedido.producto.precio
          })
        )
        try {
          const {data}=await clientAxios.post('/api/pedidos',{productos});
          toast.success(data.message);
          console.log(data.pedido);
          setPedidos([]);
        } catch (error) {
          toast.error(error.response?.data?.message||error.message);
        }
    }


    return (
        <QuioscoContext.Provider 
            value={{
                user,
                productSelected, 
                handleClickSetProduct,
                pedidos,
                handleAddPedido,
                handleEditPedido,
                handleRemovePedido,
                handleSendPedidos
             }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}