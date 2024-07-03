import React, { useEffect, useState } from 'react';
import CardModal from './CardModal';
import beeCard from '../utils/BeeCard';
import { motion, AnimatePresence } from 'framer-motion';
import { stopSound } from '../utils/sound';
import { useGlobalContext } from '../context/Context';

function Card({ challenge, i }) {
  const { updateChallengeOpened, points, setPoints, setIsExploding } = useGlobalContext();
  const [modalOpened, setModalOpened] = useState(false);
  const [isOpened, setIsOpened] = useState(challenge.isOpened);
  const [completed, setCompleted] = useState(challenge.completed); // Estado para manejar completed
  const isFreePoint = challenge.type === 'free-points';

  useEffect(() => {
    setIsOpened(challenge.isOpened);
    setCompleted(challenge.completed); // Actualizar estado cuando challenge.completed cambie
  }, [challenge]);

  const openModal = () => {
    setModalOpened(true);
    if (isFreePoint && !isOpened) {
      setIsExploding(true);
      setPoints(points + 1);
    }
  };

  const closeModal = () => {
    setIsExploding(false);
    setModalOpened(false);
  };

  const handleHoverStart = () => {
    //playSound('../../public/card-hover.wav');
  };

  const handleHoverStop = () => {
    stopSound();
  };

  const handleClickCard = () => {
    if (!modalOpened) {
      openModal();
      setIsOpened(true);
      updateChallengeOpened(challenge.id);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpened ? (
          <motion.div
            key="opened-card"
            className={`opened-challenge-card ${challenge.completed === 2 && !isFreePoint ? 'not-completed-challenge-card' : ''}`}
            style={{ backgroundImage: `url(${beeCard(challenge.type, completed)})` }}
            onClick={handleClickCard}
          >
            <div className="w-100 h-100 d-flex justify-content-center align-items-center"></div>
          </motion.div>
        ) : (
          <motion.div
            key="closed-card"
            initial={{ opacity: 1, scale: 1, translateX: 0, translateY: 0 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverStop}
            transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
            className={`closed-challenge-card `}
            onClick={handleClickCard}
          >
            <div className="w-100 h-100 d-flex justify-content-center align-items-center"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mostrar el Modal cuando modalOpened es true y pasar el challenge correcto */}
      {modalOpened && <CardModal closeModal={closeModal} challenge={challenge} />}
    </>
  );
}

export default Card;
