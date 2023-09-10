import React from 'react';



const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center modalBackdrop">
    <div className="bg-white w-3/4 md:max-w-md p-6 rounded-lg shadow-lg modalContent">
      <span className="absolute top-0 right-0 p-4 closeButton" onClick={onClose}>
        &times;
      </span>
      {children}
    </div>
  </div>
  );
};

export default Modal;
