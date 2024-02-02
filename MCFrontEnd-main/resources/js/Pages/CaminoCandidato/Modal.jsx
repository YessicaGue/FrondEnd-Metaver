import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    const closeModal = () => {
      onClose();
    };
  

    return (
      <div className="fixed top-0 max-w-auto h-full w-full flex items-center justify-center">
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50" onClick={closeModal}></div>
        <div className="z-10 justify-end bg-white rounded-lg p-10 mr-20 shadow-lg">
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;