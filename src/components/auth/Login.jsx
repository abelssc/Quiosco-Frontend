import React from 'react'
import { Form, Link, redirect, useActionData } from 'react-router-dom'
import clientAxios from '../../config/axios';

export async function action({request}){
    const formData = await request.formData();
    const body = Object.fromEntries(formData);

    try {
        const response = await clientAxios.post('/api/login', body);
        localStorage.setItem('token', response.data.token);
        return redirect('/');
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.errors) {
            // error.response.data.errors Objeto de arreglos
            return { errors: error.response.data.errors };
        }else if(error.response && error.response.data && error.response.data.message){
            // error.response.data.message String
            return { errors: { general: error.response.data.message } };
        }
        return { errors: { general: 'Ocurrió un error inesperado.' } };
    }
}

const Login = () => {
    const actionData = useActionData();
    const errors = actionData?.errors || {};
    return (
        <>
            <h1 className='text-6xl font-bold'>Inicia Sesi&oacute;n</h1>
            <p>Para generar un pedido debes iniciar sesi&oacute;n</p>
            <Form method='POST' className='w-[500px] max-w-full px-4 py-8 my-8 flex flex-col gap-3 shadow-lg'>
                {errors.general && <span className="text-red-600 font-semibold">{errors.general}</span>}
                <label htmlFor="email">Email:</label>
                <input type="email" name='email' id='email' placeholder='Tu Email' className='p-2 rounded bg-blue-50' />
                {errors.email && errors.email.map((error, index) => (
                        <span key={index} className="text-red-600 font-semibold">{error}</span>
                ))}
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" placeholder='Tu Password' className='p-2 rounded bg-blue-50' />
                {errors.password && errors.password.map((error, index) => (
                        <span key={index} className="text-red-600 font-semibold">{error}</span>
                ))}
                <button className='bg-blue-700 text-white font-bold rounded p-2 mt-4'>INICIAR SESI&Oacute;N</button>
            </Form>
            <p>No tienes cuenta? <Link to={'/auth/register'} className='text-blue-700'>Crea una</Link> </p>
        </>
    )
}

export default Login