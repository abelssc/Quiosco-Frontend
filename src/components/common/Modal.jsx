import { useContext, useEffect } from 'react'
import ReactModal from 'react-modal'
import { ModalContext } from '../../context/ModalContext'

const Modal = ({children}) => {
    const {showModal,handleCloseModal}=useContext(ModalContext);

    useEffect(() => {
        ReactModal.setAppElement('#root');
    }, []);
    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          paddingTop : 0
        },
      };

    return (
        <ReactModal 
            isOpen={showModal} 
            onRequestClose={handleCloseModal}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
        >
            <button 
                className='block font-bold ml-auto p-2 hover:text-blue-400'
                onClick={handleCloseModal}
            >
                    X
            </button>
            {children}
        </ReactModal>
    )
}

export default Modal