import { React, useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../context/Context';
import { updateMaxPoints } from '../Firebase/updatePoints';
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
  const { setMaxPoints } = useGlobalContext();
  const [inputMaxPoints, setInputMaxPoints] = useState(20);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setInputMaxPoints(value);
    }
  };

  const handleSubmit = () => {
    setMaxPoints(inputMaxPoints);
    updateMaxPoints(inputMaxPoints);
    closeModal();
  };

  return (
    <div className="modal">
      <motion.div className="modal-content" variants={dropIn} initial="hidden" animate="visible" exit="exit">
        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
        <div>
          <label htmlFor="inputMaxPointsInput">Número máximo de puntos:</label>
          <input
            type="number"
            id="inputMaxPointsInput"
            name="inputMaxPointsInput"
            onChange={handleInputChange}
            min={0}
            step={1}
          />
        </div>
        <button onClick={handleSubmit}>Set Max Points</button>
      </motion.div>
    </div>
  );
};

export default Modal;
