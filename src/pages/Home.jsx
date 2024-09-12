import React, { useEffect } from 'react'
import Sidebar from '../components/layouts/Sidebar'
import Catalog from '../components/layouts/Catalog'
import Cart from '../components/layouts/Cart'
import { Navigate, Outlet, redirect, useNavigate } from 'react-router-dom'
import Modal from '../components/common/Modal'
import { ModalProvider } from '../context/ModalContext'
import ProductModal from '../components/common/ProductModal'
import { QuioscoProvider } from '../context/QuioscoContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  // Si queremos que no haya ese destello de redirección, podemos hacerlo de la siguiente manera: y eliminar el loader del router
  const navigate = useNavigate();  
  // // if url is / then navigate to /category/cafe using react-router-dom
  useEffect(() => {
    if (window.location.pathname === '/') {
      console.log('Redirecting to /category/cafe');
      navigate('/category/cafe');
    }
  }, []);

  return (
    <QuioscoProvider >
      <ModalProvider>
        <div className='w-full h-screen flex'>
          <Sidebar />
          <Outlet />
          <Cart />
        </div>
        <Modal>
          <ProductModal />
        </Modal>
        <ToastContainer />
      </ModalProvider>
    </QuioscoProvider>
  )
}

export default Home