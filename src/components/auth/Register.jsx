import React from 'react'
import { Form, Link, redirect, useActionData } from 'react-router-dom'
import clientAxios from '../../config/axios';

export async function action({request}){
    const formData = await request.formData();
    const body = Object.fromEntries(formData);

    try {
        const response = await clientAxios.post('/api/register', body);
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

const Register = () => {
    const actionData = useActionData();
    const errors = actionData?.errors || {};
    console.log(actionData);
    
    
    return (
        <>
            <h1 className='text-6xl font-bold'>Crea tu cuenta</h1>
            <p>Crea tu cuenta llenando el formulario</p>
            <Form
                method='POST'
                className='w-[500px] max-w-full px-4 py-8 my-8 flex flex-col gap-3 shadow-lg'
            > 
                {errors.general && <span className="text-red-600 font-semibold">{errors.general}</span>}
                <label htmlFor="name">Nombre:</label>
                <input type="text" name='name' id='name' placeholder='Tu Nombre' className='p-2 rounded bg-blue-50' />
                {errors.name && errors.name.map((error, index) => (
                        <span key={index} className="text-red-600 font-semibold">{error}</span>
                ))}
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
                <label htmlFor="password_confirmation">Repetir Password:</label>
                <input type="password" name='password_confirmation' id='password_confirmation' placeholder='Repetir Password' className='p-2 rounded bg-blue-50' />
                <button className='bg-blue-700 text-white font-bold rounded p-2 mt-4'>CREAR CUENTA</button>
            </Form>
            <p>Ya tienes una cuenta? <Link to={'/auth/login'} className='text-blue-700'>Inicia Sesi&oacute;n</Link> </p>
        </>
    )
}

export default Register