import React from 'react';
import { motion } from 'framer-motion';
import beeIcon from '../utils/BeeIcon';
import { useGlobalContext } from '../context/Context';
import { updatePoints } from '../Firebase/updatePoints';
import { updateCompleted } from '../Firebase/updateCompleted';

const CardModal = ({ closeModal, challenge }) => {
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
  const { points, setPoints } = useGlobalContext();
  console.log('Challenge modal', challenge);
  const handleSuccess = () => {
    setPoints(points + 1);
    updatePoints(points + 1);
    updateCompleted(challenge.id);
    closeModal();
  };

  const handleFailure = () => {
    closeModal();
  };

  return (
    <div className="modal">
      <motion.div className="modal-content" variants={dropIn} initial="hidden" animate="visible" exit="exit">
        <div className="d-flex justify-content-end">
          <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
        </div>
        <div className="h-50 d-flex justify-content-center">
          <img className="image-modal" src={beeIcon(challenge.type)} alt="bee icon" />
        </div>
        <div className="h-100 modal-challenge">
          <p>{challenge.challenge}</p>
        </div>
        <div className="w-100 d-flex justify-content-between">
          <button className="w-25" onClick={handleSuccess}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-calendar2-check"
              viewBox="0 0 16 16"
            >
              <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0" />
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1V.5a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0-.5.5V1H1a1 1 0 0 0-1 1zm-1 2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4H0v.5z" />
            </svg>
          </button>
          <button className="w-25" onClick={handleFailure}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-calendar-x"
              viewBox="0 0 16 16"
            >
              <path d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708" />
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CardModal;
