import React, { useState } from 'react';
import CardModal from './CardModal';
import beeCard from '../utils/BeeCard';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound, stopSound } from '../utils/sound';
import { useGlobalContext } from '../context/Context';
import { changeChallengeOpen } from '../Firebase/changeChallengeOpen';

function Card({ challenge, i }) {
  const { modalOpened, setModalOpened } = useGlobalContext();
  const [isOpened, setIsOpened] = useState(challenge.isOpened);

  const cardChallenge = challenge;

  const openModal = () => {
    // Cambiar el estado local y también en Firebase si es necesario
    setIsOpened(true);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const handleHoverStart = () => {
    //playSound('../../public/bee-sound.wav');
  };

  const handleHoverStop = () => {
    stopSound();
  };

  return (
    <>
      <AnimatePresence>
        {isOpened ? (
          <motion.div
            key="opened-card"
            className="opened-challenge-card"
            style={{ backgroundImage: `url(${beeCard(challenge.type)})` }}
            onClick={openModal}
          >
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
              <p>
                {challenge.type}
                {challenge.challenge}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="closed-card"
            initial={{ opacity: 1, scale: 1, translateX: 0, translateY: 0 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverStop}
            transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
            className="closed-challenge-card"
            onClick={openModal}
          >
            <div className="w-100 h-100 d-flex justify-content-center align-items-center"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mostrar el Modal cuando modalOpened es true y pasar el challenge correcto */}
      {modalOpened && <CardModal closeModal={closeModal} challenge={cardChallenge} />}
    </>
  );
}

export default Card;
