import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({children})=>{
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true); 
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }
    return (
        <ModalContext.Provider 
            value={{ 
                showModal,
                handleOpenModal,
                handleCloseModal
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}