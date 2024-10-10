import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className=" absolute top-5 right-10 cursor-pointer text-2xl" onClick={onClose}>&times;</span>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;