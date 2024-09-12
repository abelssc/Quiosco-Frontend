import clientAxios from "../config/axios";

export async function getCategoryByUri(uri){
  try {
    const {data}=await clientAxios.get(`/api/categorias/${uri}`);
    return data;
  } catch (error) {
    throw new Error('No existe la categoria');
  }
}


export async function getCategorias(){
  try {
    // const url=import.meta.env.VITE_API_URL+'/api/categorias';
    const {data}=await clientAxios.get('/api/categorias');
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return null;
  }  
}

//esto ya no es necesario ya que hacemos la peticion a la bbdd
// const categorias = [
//     {
//         icono: "cafe",
//         nombre: "Café",
//         uri: "cafe",
//         id:1
//       },
//       {
//         icono: "hamburguesa",
//         nombre: "Hamburguesas",
//         uri: "hamburguesas",
//         id: 2
//       },
//       {
//         icono: "pizza",
//         nombre: "Pizzas",
//         uri: "pizzas",
//         id: 3
//       },
//       {
//         icono: "dona",
//         nombre: "Donas",
//         uri: "donas",
//         id: 4
//       },
//       {
//         icono: "pastel",
//         nombre: "Pasteles",
//         uri: "pasteles",
//         id: 5
//       },
//       {
//         icono: "galletas",
//         nombre: "Galletas",
//         uri: "galletas",
//         id: 6
//       }
// ]

// export {
//     categorias 
// }