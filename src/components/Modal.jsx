import React from 'react';
import { motion } from 'framer-motion';
import beeIcon from '../utils/BeeIcon';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 2, // Duración ajustada para la animación del modal
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: {
      duration: 2, // Duración ajustada para la animación de salida del modal
    },
  },
};

const Modal = ({ closeModal, type, challenge }) => {
  return (
    <div className="modal">
      <motion.div className="modal-content" variants={dropIn} initial="hidden" animate="visible" exit="exit">
        <div className="d-flex justify-content-end">
          <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
        </div>
        <div className="h-50 d-flex justify-content-center">
          <img className="image-modal" src={beeIcon(type)} alt="bee icon" />
        </div>
        <div className="h-100 modal-challenge">
          <p>{challenge}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
