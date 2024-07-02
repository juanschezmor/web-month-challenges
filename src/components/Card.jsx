import React, { useState } from 'react';
import Modal from './Modal';
import beeCard from '../utils/BeeCard';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound, stopSound } from '../utils/sound';
import { useGlobalContext } from '../context/Context';
import { changeChallengeOpen } from '../Firebase/changeChallengeOpen';
import HypeComponent from './Animation'; // Importa tu HypeComponent aquí
import { set } from 'firebase/database';

function Card({ challenge, i }) {
  const { isAnimating, setIsAnimating, modalOpened, setModalOpened } = useGlobalContext();
  const [challengeOpened, setChallengeOpened] = useState(challenge.isOpened);

  const changeChallengeOpened = () => {
    // Change the firebase document
    changeChallengeOpen(challenge.id);
  };

  const openModal = () => {
    changeChallengeOpened();
    setChallengeOpened(true);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const handleHoverStart = () => {
    playSound('../../public/bee-sound.wav');
  };

  const handleHoverStop = () => {
    stopSound();
  };

  return (
    <>
      <AnimatePresence>
        {challengeOpened ? (
          <motion.div
            key="opened-card"
            className="opened-challenge-card"
            style={{ backgroundImage: `url(${beeCard(challenge.type)})` }}
            onClick={openModal}
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
            className="closed-challenge-card"
            onClick={openModal}
          >
            <div className="w-100 h-100 d-flex justify-content-center align-items-center"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mostrar el Modal cuando modalOpened es true */}
      {modalOpened && <Modal closeModal={closeModal} type={challenge.type} challenge={challenge.challenge} />}
    </>
  );
}

export default Card;
