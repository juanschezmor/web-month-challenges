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

const RewardsModal = ({ closeModal }) => {
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
          <div className="form-group d-flex flex-column justify-content-start">
            <div className="row d-flex  ">
              <label className="col-6 text-start" htmlFor="input-goal-1">
                First goal:
              </label>
              <input
                type="number"
                id="input-goal-1"
                name="input-goal-1"
                onChange={handleInputChange}
                min={0}
                step={1}
                className="col-3 form-control h-75 w-25 mx-2"
              />
              <p className="col-2">%</p>
            </div>
            <div className="row d-flex">
              <label className="col-6 text-start" htmlFor="input-goal-1">
                Second goal:
              </label>
              <input
                type="number"
                id="input-goal-1"
                name="input-goal-1"
                onChange={handleInputChange}
                min={0}
                step={1}
                className="col-3 form-control h-75 w-25 mx-2"
              />
              <p className="col-2">%</p>
            </div>
            <div className="row d-flex">
              <label className="col-6 text-start" htmlFor="input-goal-3">
                Third goal:
              </label>
              <input
                type="number"
                id="input-goal-3"
                name="input-goal-3"
                onChange={handleInputChange}
                min={0}
                step={1}
                className="col-3 form-control h-75 w-25 mx-2"
              />
              <p className="col-2">%</p>
            </div>
            <div className="row d-flex">
              <label className="col-6 text-start" htmlFor="input-goal-4">
                Fourth goal:
              </label>
              <input
                type="number"
                id="input-goal-4"
                name="input-goal-4"
                onChange={handleInputChange}
                min={0}
                step={1}
                className="col-3 form-control h-75 w-25 mx-2"
              />
              <p className="col-2">%</p>
            </div>
          </div>
          <button onClick={handleSubmit} className="generic-button">
            Start new month!
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RewardsModal;
