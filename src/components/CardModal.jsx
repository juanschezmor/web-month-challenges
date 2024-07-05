import React from 'react';
import { motion } from 'framer-motion';
import beeIcon from '../utils/BeeIcon';
import { useGlobalContext } from '../context/Context';
import ConfettiExplosion from 'react-confetti-explosion';
import { dropIn } from '../utils/ModalDropIn.js';

const CardModal = ({ closeModal, challenge }) => {
  const { points, setPoints, updateChallengeCompleted, isExploding, setIsExploding } = useGlobalContext();

  const isFreePoint = challenge.type === 'free-points';

  const handleSuccess = () => {
    if (challenge.completed === 1) return;
    setPoints(points + 1);
    updateChallengeCompleted(challenge.id, 1);
    closeModal();
    setIsExploding(true);
  };

  const handleFailure = () => {
    updateChallengeCompleted(challenge.id, 0); // Actualizar completed en el contexto
    closeModal();
  };

  const handleNeutral = () => {
    updateChallengeCompleted(challenge.id, 2); // Actualizar completed en el contexto
    closeModal();
  };

  return (
    <div className={`modal`}>
      <motion.div
        className={`modal-content bg-${challenge.type}  `}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="d-flex justify-content-end">
          <button type="button" className="geneic-button btn-close" aria-label="Close" onClick={closeModal} />
        </div>
        <div className="h-50 d-flex justify-content-center">
          <img className="image-modal" src={beeIcon(challenge.type, challenge.completed)} alt="bee icon" />{' '}
        </div>

        {!isFreePoint ? (
          <>
            <div className="h-100 modal-challenge">
              <p>{challenge.challenge}</p>
            </div>
            <div className="w-100 d-flex justify-content-between">
              <button className="w-25 generic-button" onClick={handleSuccess}>
                Success
              </button>
              <button className="w-25 generic-button" onClick={handleNeutral}>
                Neutral
              </button>
              <button className="w-25 generic-button" onClick={handleFailure}>
                Failure
              </button>
            </div>
          </>
        ) : (
          <div className="modal-free-point">
            <p>FREE POINT!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CardModal;
