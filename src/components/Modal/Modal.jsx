import React, { useEffect } from 'react';
import styles from './Modal.module.css';

export const Modal = ( {closeModal, imgData}) => {

  const handleOverlayClick = (evt) => {
    const overlay = evt.currentTarget;
    if (evt.target === overlay) {
      closeModal();
    }
  }

 useEffect(() => {
    const handleEcsapeKey = (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    }


    document.addEventListener('keydown', handleEcsapeKey);
  

 
    return () => {
      document.removeEventListener("keydown", handleEcsapeKey);
    }
  }, [closeModal])
  
  const {overlay, modal} = styles;
  const {src, alt} = imgData;

    return (
      <div className={overlay} onClick={handleOverlayClick}>
        <div className={modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }


export default Modal;
