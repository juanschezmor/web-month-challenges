import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../context/Context';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 2,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: {
      duration: 2,
    },
  },
};

const PointsModal = ({ closeModal }) => {
  const { setMaxPoints, resetChallenges, fetchData } = useGlobalContext();
  const [inputMaxPoints, setInputMaxPoints] = useState(20);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setInputMaxPoints(value);
    }
  };

  const handleSubmit = async () => {
    await setMaxPoints(inputMaxPoints);
    await resetChallenges();
    await fetchData();
    closeModal();
  };

  return (
    <div className="modal">
      <motion.div className="modal-content" variants={dropIn} initial="hidden" animate="visible" exit="exit">
        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="inputMaxPointsInput">Number of days:</label>
            <input
              type="number"
              id="inputMaxPointsInput"
              name="inputMaxPointsInput"
              onChange={handleInputChange}
              min={0}
              step={1}
              className="form-control"
            />
          </div>
          <button onClick={handleSubmit} className="generic-button">
            Start new month!
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PointsModal;
